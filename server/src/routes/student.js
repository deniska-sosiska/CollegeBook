const router =  require('express-promise-router')()
const {  student  } = require('../controllers')

router.route('/:id').get(student.get)
router.route('/').get(student.getAll)
router.route('/registration').post(student.create)
router.route('/:id').put(student.update)
router.route('/:id').delete(student.delete)

router.route('/studentsByGroup/:groupID').get(student.studentsByGroup)

module.exports = router