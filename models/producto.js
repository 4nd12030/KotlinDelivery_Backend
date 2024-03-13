const db = require('../config/config')

const Producto = {}

Producto.findByCategoria = (id_categoria)  => {
    const sql = `
    SELECT
        P.id,
    	P.nombre,
	    P.descripcion,
	    P.precio,
	    P.image1,
	    P.image2,
	    P.image3,
	    P.id_categoria
    FROM
        productos AS P
    INNER JOIN 
        categorias AS C
    ON
        P.id_categoria = C.id
    WHERE 
        C.id = $1
    `

    return db.manyOrNone(sql, id_categoria)
}

Producto.getAll = () => {
    const sql = `
    SELECT  *
    FROM productos
    `
    return db.manyOrNone(sql)
}

Producto.create = (producto) => {
    const sql = `
    INSERT INTO
    productos(
        nombre,
        descripcion,
        precio,
        image1,
        image2,
        image3,
        id_categoria,
        created_at,
        updated_at
    )
    VALUES($1,$2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `
    console.log('Prducto en create: ', producto)
    return db.oneOrNone(sql, [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.image1,
        producto.image2,
        producto.image3,
        producto.id_categoria,
        new Date(),
        new Date()
    ])
}

Producto.update = (producto) => {
    const sql = `
    UPDATE   
        productos
    SET
        nombre = $2,
        descripcion = $3,
        precio = $4,
        image1= $5,
        image2 = $6,
        image3 = $7,
        id_categoria = $8,
        created_at = $9,
        updated_at = $10
    WHERE 
        id = $1
    `
    console.log('Prducto en update: ', producto)
    return db.none(sql, [
        producto.id,
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.image1,
        producto.image2,
        producto.image3,
        producto.id_categoria,
        new Date(),
        new Date()
    ])
}



module.exports = Producto