const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

class UserController {
    static signup(req, res, next) {
        let { name, email, password, admin } = req.body
        user
            .create({
                name,
                email,
                password,
                admin
            })
            .then(createdUser => {
                res.status(200).json(createdUser)
            })
            .catch(next)
    }
    static signin(req, res, next) {
        let { email, password } = req.body
        user
            .findOne({ email })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let payload = user
                        var token = jwt.sign({ payload }, process.env.SECRET);
                        res.status(200).json({ data: user, token: token })
                    } else {
                        res.status(400).json({ error: 'email or password is wrong' })
                    }
                } else {
                    res.status(400).json({ error: 'email or password is wrong' })
                }
            })
            .catch(next)
    }
    static getVerify(req,res,next){
        res.status(200).json(req.decoded)
    }
    static cart(req,res, next){
        let id = req.decoded._id
        user
            .findById(id)
            .populate('cart')
            .then( user => {
                res.status(200).json( user.cart)
            })
            .catch(next)
    }
    static productToCart(req,res, next){
        let id = req.decoded._id
        let productId = req.params.productId
        user
            .findOneAndUpdate({_id:id},
                {$push:
                    {cart: productId}
                },
                {new:true}
            )
            .populate('cart')
            .then( updated => {
                res.status(200).json( updated )
            })
            .catch(next)
    }
    static removeProductFromCart(req,res, next){
        let id = req.decoded._id
        let productId = req.params.productId
        user
            .findOneAndUpdate({_id:id},
                {$pull:
                    {cart: productId}
                },
                {new:true}
            )
            .populate('cart')
            .then( updated =>{
                res.status(200).json(updated)
            })
            .catch(next)
    }
    static emptyCart(req,res, next){
        let id = req.decoded._id
        user
            .findOneAndUpdate(
                {
                    _id:id
                },{
                    cart:[]
                },{
                    new:true
                }
            )
            .then(updated=>{
                res.status(200).json(updated)
            })
            .catch(next)
            
    }
}
module.exports = UserController