const product = require('../models/product')

class productController {
    static getProducts(req, res, next) {
        product
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }
    static getSpecificProduct(req, res, next) {
        let id = req.params.id
        product
            .findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static create(req, res, next) {
        let image = null
        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let { name, stock, description, price } = req.body
        console.log(stock)
        let id = req.decoded._id
        product
            .create({
                name,
                stock,
                price,
                description,
                image,
                seller: id
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        let id = req.params.id
        product
            .findOneAndDelete({ _id: id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }
    static update(req, res, next) {
        let id = req.params.id
        product
            .findById(id)
            .then(product => {
                product.set(req.body)
                return product.save()
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)
    }
}
module.exports = productController