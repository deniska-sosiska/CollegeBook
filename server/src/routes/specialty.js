const router = require('express-promise-router')();
const { specialty } = require('../controllers');

router.route('/:id').get(specialty.get);
router.route('/').get(specialty.getAll);
router.route('/').post(specialty.create);
router.route('/:id').put(specialty.update);
router.route('/:id').delete(specialty.delete);

module.exports = router;
