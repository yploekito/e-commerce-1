const product = require('../models/product')
module.exports = function(req,res,next){
    let productId = req.params.id
    let userId = req.decoded._id
    product
        .findById(productId)
        .then(product=>{
            if(product.seller.equals(userId)){
                next()
            }else{
                res.status(401).json({ error:'error', message:'unauthorized access'})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
}