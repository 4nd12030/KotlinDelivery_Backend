
//En este archivo se configuran las url para solictar el servicio al servidor

const CategoriasController = require('../controllers/categoriasController')
const passport=  require('passport')

module.exports = (app, upload) => {

    //GET => Traer Datos
    app.get('/api/categorias/getAll', passport.authenticate('jwt', {session: false}), CategoriasController.getAll)
    
    //POST => Guardar Datos
    app.post('/api/categorias/create', passport.authenticate('jwt', {session: false}), upload.array('image', 1), CategoriasController.create)

    //PUT => ACTUALIZA DATOS
    //401 UNAUTHORIZED

}