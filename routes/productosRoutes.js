

//En este archivo se configuran las url para solictar el servicio al servidor

const ProductoController = require('../controllers/productosController')
const passport=  require('passport')

module.exports = (app, upload) => { //upload para subir archivos

    //GET => Traer Datos
    //app.get('/api/productos/getAll', passport.authenticate('jwt', {session: false}), ProductoController.getAll)

    //POST => Guardar Datos
    app.get('/api/productos/findByCategoria/:id_categoria', passport.authenticate('jwt', {session: false}), ProductoController.findByCategoria)
    
    //POST => Guardar Datos
    app.post('/api/productos/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductoController.create)

    //PUT => ACTUALIZA DATOS
    //401 UNAUTHORIZED
    //app.put('/api/usuarios/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsuariosController.update)




}