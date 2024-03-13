//Archivo de querys de la base de datos

const db = require('../config/config')  //Archvivo de configuracion del servidor de la bd]}}
const bcrypt = require('bcryptjs') // Instalacion de la libreria bcryptjs 

const Usuario = {} //Objeto que contendra la informacion del query

//getAll es la funcion que regresa ninguno o todos los resultados del query de la constante sql 
Usuario.getAll = () => {
    const sql = `
    SELECT 
    * 
    FROM 
    usuarios`

    return db.manyOrNone(sql)
}


Usuario.findByEmail = (email) => {
    const sql =`
    SELECT 
        U.id,
        U.email,
        U.nombre,
        U.apellido,
        U.image,
        U.telefono,
        U.contrasena,
        U.session_token,
		json_agg(
			json_build_object(
				'id', R.id,
				'nombre', R.nombre,
				'imagen', R.imagen,
				'ruta', R.ruta
			) 
		) AS roles
    FROM
       usuarios AS U
	INNER JOIN 
	   usuarios_tiene_roles AS UTR
	ON 
	   UTR.id_usuario = U.id
	INNER JOIN 
	   roles AS R
	ON 
	   R.id = UTR.id_rol
    WHERE
       U.email = $1
	GROUP BY 
	   U.id
    `

    return db.oneOrNone(sql, email)    
}


Usuario.findById = (id, callback) => {
    const sql =
    `SELECT 
        id,
        email,
        nombre,
        apellido,
        image,
        telefono,
        contrasena,
        session_token
    FROM
       usuarios
    WHERE
       id = $1`

    return db.oneOrNone(sql, id).then(usuario => { callback(null, usuario) })
}

Usuario.create = async (usuario) => {

    const hash = await bcrypt.hash(usuario.contrasena, 10)

    const sql = `
    INSERT INTO
    usuarios(
        email,
        nombre,
        apellido,
        telefono,
        image,
        contrasena,
        created_at,
        update_at
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

    return db.oneOrNone(sql, [
        usuario.email,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.image,
        //usuario.contrasena,
        hash,
        new Date(),
        new Date()

    ])
}

Usuario.update = (usuario) => {

    //console.log('3-Usuario dentro de Update: ', usuario)
    const sql =`
    UPDATE
        usuarios
    SET
       nombre = $2,
       apellido = $3,
       telefono = $4,
       image = $5,
       update_at =$6
    WHERE
        id = $1
    `
    return db.none(sql, [
        usuario.id,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.image,
        new Date()
    ])
}

Usuario.updateSessionToken = (id_usuario, session_token) => {

    console.log('Usuario dentro de UpdateSessionToken: ', session_token)
    const sql =`
    UPDATE
        usuarios
    SET
       session_token = $2
    WHERE
        id = $1
    `
    return db.none(sql, [
        id_usuario,
        session_token
    ])
}

module.exports = Usuario //Permite utilizar le objeto Usuario en otros archivos