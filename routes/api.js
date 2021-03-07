// Initialize express router
let router = require('express').Router()

const emailController = require('../controllers/emailController')
// const waController = require('../controllers/waController')


router.route('/email')
    .post(emailController.index)

//
// router.route('/wa/create/:name')
//     .get(waController.index)


// Export API routes
module.exports = router