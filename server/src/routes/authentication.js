const router =  require('express-promise-router')()
const {  auth  } = require('../controllers')

router.route('/').post(auth.authentication)

module.exports = router