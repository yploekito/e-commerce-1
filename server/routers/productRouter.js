const router = require('express').Router()
const imageMiddleware = require('../middleware/image')
const {
    upload, sendUploadToGCS
} = imageMiddleware

//pindah ke controller 
const productController = require('../controller/productController')
const productAuthorization = require('../middleware/productAuthorization')
const authentication = require('../middleware/authentication')

router.get('/', productController.getProducts)
router.get('/:id', productController.getSpecificProduct )
router.use(authentication)

router.post('/',upload.single('image'),sendUploadToGCS, productController.create)
router.delete('/:id', productAuthorization, productController.delete)
router.patch('/:id', productAuthorization, productController.update)

module.exports = router
