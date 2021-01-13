// Initialize express router
let router = require('express').Router()

const emailController = require('../controllers/emailController')


router.route('/email')
    .post(emailController.index)


// Export API routes
module.exports = router