
const db = require('../config/config')

const Categoria = {}

Categoria.getAll = () => {
    const sql = `
    SELECT * 
    FROM
     categorias
    `

    return db.manyOrNone(sql)
}


Categoria.create = (categoria) => {

    const sql = `
    INSERT INTO 
    categorias (
        nombre,
        image,
        created_at,
        updated_at
    )
    VALUES($1,$2,$3,$4) RETURNING id
    `
    return db.oneOrNone(sql,[
        categoria.nombre,
        categoria.image,
        new Date(),
        new Date()
    ])
}

module.exports = Categoria