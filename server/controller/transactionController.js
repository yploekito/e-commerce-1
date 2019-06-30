const transaction = require('../models/transaction')
const user = require('../models/user')
const product = require('../models/product')
class TransactionController {
    static getAll(req, res, next) {
        transaction
            .find({})
            .populate('products')
            .populate('userId')
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }
    static getHistory(req, res, next) {
        let id = req.decoded._id
        transaction
            .find({ userId: id })
            .populate('products')
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)

    }
    static create(req, res, next) {
        let id = req.decoded._id
        let cart = []
        let products ={}
        user
            .findById(id)
            .then(user => {
                if(user.cart.length === 0){
                    throw {error:'empty cart', code:400}
                }
                cart = user.cart
                let promise = []
                cart.forEach(product => {
                    if (!products[product._id]) {
                        products[product._id] = {};
                        products[product._id].qty = 1;
                        products[product._id].detail = product;
                    } else {
                        products[product._id].qty += 1;
                    }
                });

                Object.keys(products).forEach(eachProduct => {
                    promise.push(product.findById(eachProduct))
                })
                return Promise.all(promise)
            })
            .then(allProducts => {
                let promise = []
                let flag = false
                allProducts.forEach(eachProduct=>{
                    if(eachProduct.quantity < products[eachProduct._id].qty){
                        flag = true
                    }
                })
                if(flag){
                    throw {error:'quantity', code:400}
                }

                allProducts.forEach(eachProduct => {
                    let quantity = eachProduct.quantity - products[eachProduct._id].qty
                    eachProduct.set({ quantity })
                    promise.push(eachProduct.save())
                })
                return Promise.all(promise)
            })
            .then(result => {
                let total = 0 
                for(let i = 0 ; i < result.length; i++){
                    total += result[i].price * products[result[i]._id].qty
                }
                return transaction.create({
                    products: cart,
                    userId: id,
                    created_at: new Date(),
                    delivered: false,
                    total: total
                })
            })
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(next)

        console.log(cart)
    }
    static update(req, res, next) {
        let transactionId = req.params.transactionId
        let updateVal = {
            delivered: true,
            delivered_date: new Date()
        }
        transaction
            .findById(transactionId)
            .then(transaction => {
                transaction.set(updateVal)
                return transaction.save()
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)
    }
}
module.exports = TransactionController