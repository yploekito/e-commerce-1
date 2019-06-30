const router = require('express').Router()

const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const transactionRouter = require('./transactionRouter')
const userController = require('../controller/userController')
const authentication = require('../middleware/authentication')
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
// router.use('/user',userRouter)

router.use('/product',productRouter)
router.use(authentication)
router.get('/authentication', userController.getVerify)
router.patch('/user/cart', userController.emptyCart)
router.patch('/user/cart/add/:productId', userController.productToCart)
router.patch('/user/cart/remove/:productId', userController.removeProductFromCart)
router.get('/user/cart', userController.cart)
router.use('/transaction', transactionRouter)

module.exports = router