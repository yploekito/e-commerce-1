const mongoose = require('mongoose')

const {Schema} = mongoose
const transactionSchema = new Schema({
    products:[{ type: Schema.Types.ObjectId, ref: 'product'}],
    userId : { type: Schema.Types.ObjectId, ref: 'user'},
    created_at: Date,
    delivered: Boolean,
    total:Number,
    delivered_date: Date
})
const transaction = mongoose.model('transaction', transactionSchema)
module.exports = transaction