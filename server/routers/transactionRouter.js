const router = require('express').Router()
const transactionController = require('../controller/transactionController')

router.get('/', transactionController.getAll)
router.get('/history', transactionController.getHistory)
router.post('/', transactionController.create)
router.patch('/:transactionId', transactionController.update)


module.exports = router