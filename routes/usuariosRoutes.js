//En este archivo se configuran las url para solictar el servicio al servidor

const UsuariosController = require('../controllers/usuariosController')
const passport=  require('passport')

module.exports = (app, upload) => {
    //Estas peticiones al servidor son diferentes de los metodos http 
    //GET => Traer Datos
    app.get('/api/usuarios/getAll', UsuariosController.getAll)
    
    //POST => Guardar Datos
    app.post('/api/usuarios/create', UsuariosController.register)

    app.post('/api/usuarios/login', UsuariosController.login)

    //PUT => ACTUALIZA DATOS
    //401 UNAUTHORIZED
    app.put('/api/usuarios/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsuariosController.update)

    //ACTUALIZA LOS DATOS pero no la imagen
    app.put('/api/usuarios/updateWithoutImage',passport.authenticate('jwt', {session: false}), UsuariosController.updateWithoutImage)
}