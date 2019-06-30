const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const user = require('../models/user')
const product = require('../models/product')
let token = null
let token2 = null
let productId = null
let transactionId = null
chai.use(chaiHttp)

const loginDetails = {
    email: 'jo@gmail.com',
    password: '12345'
}
const loginDetails2 = {
    email: 'orvin@gmail.com',
    password: '12345'
}
before(function (done) {
    user
        .deleteMany({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})
before(function (done) {
    product
        .deleteMany()
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signup')
        .send({
            name: 'yonathan',
            email: 'jo@gmail.com',
            password: 12345
        })
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(err).to.be.null
            expect(res.body).to.be.an('object')
            done()
        })
})

before(function (done) {

    chai
        .request(app)
        .post('/signup')
        .send({
            name: 'orvin',
            email: 'orvin@gmail.com',
            password: 12345
        })
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(err).to.be.null
            expect(res.body).to.be.an('object')
            done()
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signin')
        .send(loginDetails)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(err).to.be.null
            expect(res.body).to.haveOwnProperty('token')
            token = res.body.token
            done()
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signin')
        .send(loginDetails2)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(err).to.be.null
            expect(res.body).to.haveOwnProperty('token')
            token2 = res.body.token
            done()
        })
})
// after(function(done){
//     user
//         .deleteMany({})
//         .then(()=>{
//             done()
//         })
//         .catch(err=>{
//             console.log(err)
//         })
// })
// after(function(done){
//     product
//         .deleteMany()
//         .then(()=>{
//             done()
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })

describe('product', function () {
    describe('GET /product', function () {
        it('should send an array with 200 status code', function (done) {
            chai
                .request(app)
                .get('/product')
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('POST /product', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .post('/product')
                .set('token', token)
                .type('form')
                .send({
                    'name': 'televisi',
                    'quantity': 100,
                    'description': 'Polytron 24 inch',
                    'image': null,
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    // console.log(res.body, 'post product')
                    productId = res.body._id
                    expect(res.body.seller).to.be.a('string')
                    done()
                })
        })
    })
    describe('GET /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .get(`/product/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    describe('PATCH /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .patch(`/product/${productId}`)
                .set('token', token)
                .send({
                    'name': 'hai'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal('hai')
                    done()
                })
        })
    })
    describe('PATCH /product/:id', function () {
        it('should send an error status 401 unauthorized', function (done) {
            chai
                .request(app)
                .patch(`/product/${productId}`)
                .set('token', token2)
                .send({
                    'name': 'hai'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })
    // describe('GET /product/myshop', function(){
    //     it('should send an array with 200 status code', function(done){
    //         chai
    //             .request(app)
    //             .
    //     })
    // })

    describe('POST /signup', function () {
        it('returns object with 200 status response', function (done) {
            chai
                .request(app)
                .post('/signup')
                .send({
                    name: 'yonathan',
                    email: 'lalala@gmail.com',
                    password: 12345
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
        it('returns error email is invalid, has to be in the correct format', function (done) {
            chai
                .request(app)
                .post('/signup')
                .send({
                    name: 'yonathan',
                    email: 'ypl',
                    password: 12345
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })
    describe('POST /signin', function () {
        it('has to return object with 200 status response', function (done) {
            chai
                .request(app)
                .post('/signin')
                .send({
                    email: 'jo@gmail.com',
                    password: '12345'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(err).to.be.null
                    done()
                })
        })
        it('has to return error object with 400 status response, when email or password is wrong', function (done) {
            chai
                .request(app)
                .post('/signin')
                .send({
                    email: 'abc',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })
    describe('PATCH /user/cart/add/:productId', function () {
        it('has to return object with 200 status response', function (done) {
            chai
                .request(app)
                .patch(`/user/cart/add/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(res.body).to.be.an('object')
                    expect(res.body.cart).to.have.lengthOf.at.least(1)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe('POST /transaction', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .post(`/transaction`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.products).to.have.lengthOf.at.least(1)
                    expect(res.body.delivered).to.equal(false)
                    transactionId = res.body._id
                    done()
                })
        })
    })
    describe('PATCH /transaction/:transactionId', function () {
        it('should have delivered property equal to true', function (done) {
            chai
                .request(app)
                .patch(`/transaction/${transactionId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.delivered).to.equal(true)
                    done()
                })
        })
    })
    describe('PATCH /user/cart/remove/:productId', function () {
        it('has to return object with 200 status response, where product id is removed from cart', function (done) {
            chai
                .request(app)
                .patch(`/user/cart/remove/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.cart).to.not.include(`${productId}`)
                    done()
                })
        })
    })
    describe('DELETE /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .delete(`/product/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })




})