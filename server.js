//Archivo para crear y levnetar el Servidor del proyecto

const express = require('express') //Librería
const app = express()
const http = require('http') //Librería
const server = http.createServer(app)
const logger = require('morgan') //Librería para el log
const cors = require('cors') //Librería
const passport = require('passport') //libreria passport

const multer = require('multer')// Libreria
const serviceAccount = require('./serviceAccountKey.json') //archivo descargado en firebase
const admin =  require('firebase-admin') //libreria

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})


/**
 * Rutas
 */
const usuarios = require('./routes/usuariosRoutes') //Archivo donde se encuentran las rutas de la API (Checkpoints)
const categorias = require('./routes/categoriasRoutes')
const productos = require('./routes/productosRoutes')
////////////////////////////////////////////////////////////


const port = process.env.POR || 3000 //Puerto por el que se comunica con el servidor

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(cors())

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.disable('x-powered-by')

app.set('port', port)


/**
 * Lllamando a las rutas
 */
usuarios(app, upload)
categorias(app, upload)
productos(app, upload)
////////////////////////

server.listen(3000, '192.168.100.92' || 'localhost', function(){
    console.log('Aplicacion de NodeJS ' + process.pid + ' Puerto: '+ port + ' Iniciada......')
})

app.get('/', (req,res) => {
    res.send('Ruta raiz del backend')
})

app.get('/test', (req,res) => {
    res.send('Esta es la ruta test')
})

//ERROR HANDLER
app.use((err, req, res, next) =>{
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})



module.export = {
    app: app,
    server: server
}


//200 - Es una respuesta exitosa
//404 - Significa que la url no existe
//500 - Error interno del servidor

