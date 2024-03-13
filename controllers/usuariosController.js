
//En este archivo se configura la respuesta del servidor de la bd
const Usuario = require('../models/usuario')
const Rol = require('../models/rol')

//const passport = require('../config/passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const storage = require('../utils/cloud_storage')
const { use } = require('passport')

//Aqui se configura la respuesta de la bd cuadno se solicitan todos los usuarios existentes en ella
module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Usuario.getAll()
            console.log(`Usuarios: ${data}`)
            return res.status(201).json(data)
        }
        catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                succes: false,
                message: 'Error al obtener los usuarios'
            })
            
        }
    },

    async register(req, res, next){
        try{
            //console.log(req)
            const usuario = req.body
            const data = await Usuario.create(usuario)
            
            ////////////////////////////////////////////
            await Rol.create(data.id, 1)
            
            const token = jwt.sign( { id: data.id, email: usuario.email }, keys.secretOrKey, {
                //expiresIn:
            })

            const myData ={
                id : data.id,
                nombre : usuario.nombre,
                apellido : usuario.apellido,
                email : usuario.email,
                telefono: usuario.telefono,
                image: usuario.image,
                session_token: `JWT ${token}`
            }

            ////////////////////////////////////////

            return res.status(201).json({
                succes: true,
                message: 'El registro se realizo correctamente',
                data: myData
            })
        }
        catch (error){
            console.log(`Error: ${error}`)
            return res.status(501).json({
                succes: false, 
                message: 'Hubo un error con el registro del usuario',
                error: error
            })

        }
    },

    async login(req,res,next) {
        try {
            //console.log(req)
            const email = req.body.email
            const contrasena = req.body.contrasena
    
            const myUser = await Usuario.findByEmail(email)
            console.log(myUser)

            if (!myUser) {
                return res.status(401).json({
                    succes: false,
                    message: 'El email no fue encontrado'
                })
            } 

            const isPasswordValid = await bcrypt.compare(contrasena, myUser.contrasena)

            if (isPasswordValid) {

                const token = jwt.sign( { id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    //expiresIn:
                })

                const data ={
                    id : myUser.id,
                    nombre : myUser.nombre,
                    apellido : myUser.apellido,
                    email : myUser.email,
                    telefono: myUser.telefono,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                 await Usuario.updateSessionToken(myUser.id, `JWT ${token}`) 

                console.log('usuario enviado ${data}')

                return res.status(201).json({
                    succes: true,
                    message: 'El usuario ha sido autenticado',
                    data:  data                   
                })


            } else {

                return res.status(401).json({ //status 401 es no autorizado
                    succes: false,
                    message: 'La contrasena es incorrecta',
                    data:  data                   
                })
                
            }

            
        } catch (error) {

            console.log(`Error: ${error}`)
            return res.status(501).json({
                succes: false, 
                message: 'Hubo un error con el login del usuario',
                error: error
            })
            
        }
    },

    async update(req,res,next) {
        try{
            console.log('Usuario', req.body.user)

            const user = JSON.parse(req.body.user) //cliente debe enviarnos un objeto usuario
            //console.log('1-Usuario Parseado', user)

            const files = req.files

            if(files.length > 0) {
                const pathImage = `image_${Date.now()}` //nombre del archivo
                const url = await storage(files[0], pathImage)

                if(url != undefined && url != null){
                    user.image = url
                }
            }
            //console.log('2-Usuario Parseado + url', user)

            await Usuario.update(user) //guardadno la url en la BD
            //console.log('4-Usuario despues deguardar BD', user)

            return res.status(201).json({
                succes: true,
                message: 'Los datos del usuario han sido actualizados',
                data: user
            })

        }
        catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                succes: false, 
                message: 'Hubo un error al actualizar los datos del usuario',
                error: error               
            })
        }
    },

    async updateWithoutImage(req,res,next) {
        try{
            console.log('Usuario', req.body)

            const user = req.body //cliente debe enviarnos un objeto usuario
            //console.log('1-Usuario Parseado', user)

        
            //console.log('2-Usuario Parseado + url', user)

            await Usuario.update(user) //guardadno la url en la BD
            //console.log('4-Usuario despues deguardar BD', user)

            return res.status(201).json({
                succes: true,
                message: 'Los datos del usuario han sido actualizados',
                data: user
            })

        }
        catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                succes: false, 
                message: 'Hubo un error al actualizar los datos del usuario',
                error: error               
            })
        }
    }
}