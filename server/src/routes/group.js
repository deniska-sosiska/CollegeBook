const router = require('express-promise-router')()
const {  group  } = require('../controllers')

router.route('/:id').get(group.get)
router.route('/').get(group.getAll)

router.route('/').post(group.create)
router.route('/:id').put(group.update)
router.route('/:id').delete(group.delete)

router.route('/specialtyID/:specialtyID').get(group.getGroupsBySpecialtyID)

module.exports = router


