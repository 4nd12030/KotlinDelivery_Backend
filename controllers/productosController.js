

const Producto = require('../models/producto')

const storage = require('../utils/cloud_storage')
const asyncForEach = require('../utils/async_foreach')

module.exports = {

    async create(req, res, next) {

        let producto = JSON.parse(req.body.producto)
        console.log('Producto: ', producto)

        const files = req.files
        console.log('Imagenes: ', files)
        let inserts = 0

        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto, no tiene imagen',
                success: false
            })
        } else {
            try {
                const data = await Producto.create(producto)
                producto.id = data.id
                console.log('Producto en controller: ', data)

                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`
                        const url = await storage(file, pathImage)

                        if(url != undefined && url != null) {
                            if(inserts == 0 ){
                                producto.image1 = url
                            } 
                            else if(inserts == 1){
                                producto.image2 = url
                            }
                            else if(inserts == 2){
                                producto.image3 = url
                            }
                        }
                        await Producto.update(producto)
                        inserts = inserts + 1

                        if(inserts == files.length) {
                            return res.status(201).json({
                                succes: true,
                                message: 'El producto se ha registrado correctamente'
                            })
                        }

                    })
                }

                start()

            } catch (error) {
                console.log(error)
                return res.status(501).json({
                succes: false,
                message: 'Hubo un error al crear el producto',
                error: error
                })
            }
        }


    },

    async findByCategoria(req, res, next) {
        try {
            const id_categoria = req.params.id_categoria //CLIENTE
            const data  = await Producto.findByCategoria(id_categoria) 
            console.log('Producto: ', data)
            return res.status(201).json(data)

        } catch (error) {
            console.log(error)
            return res.status(501).json({
            succes: false,
            message: 'Hubo un error al listar los productos',
            error: error
            })
        }
    }


}
