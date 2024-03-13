//Archivo de configuracion del servidor de la base de datos

const promise = require('bluebird') //Librería 
const options = {
    promiseLib: promise, //libreria pg-promise
    query: (e) => {}
}

const pgp = require('pg-promise')(options)
const types = pgp.pg.types
types.setTypeParser(1114, function(stringValue){
    return stringValue;
})

const databaseConfig = { //Objeto con los datos de la base de datos creada en Postgres (pgAdmin)
    'host' : '127.0.0.1',
    'port' : 5432,
    'database' : 'delivery_db',
    'user' : 'postgres',
    'password' : 'root'
}

const db = pgp(databaseConfig)

module.exports = db //Exporta la constante para poder ser utilizada en otro archivo 


