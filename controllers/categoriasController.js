

const Categoria = require('../models/categoria')

const storage = require('../utils/cloud_storage')

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Categoria.getAll()
            console.log(`Categoria: ${data}`)
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

    async create(req, res, next) {
        console.log('REQ BODY', req.body)

        try {
            const categoria = JSON.parse(req.body.categoria)
            console.log('Categoria', categoria)


            const files = req.files

            if(files.length > 0) {
                const pathImage = `image_${Date.now()}` //nombre del archivo
                const url = await storage(files[0], pathImage)

                if(url != undefined && url != null){
                    categoria.image = url
                }
            }

            const data  = await Categoria.create(categoria)

            return res.status(201).json({
                succes: true,
                message: 'La categoria se ha creado exitosamente',
                data: {
                    'id': data.id
                }
            })

        } catch (error) {

            return res.status(501).json({
                succes: false,
                message: 'Hubo un error al crear la categoria',
                error: error
            })

        }
    }
}