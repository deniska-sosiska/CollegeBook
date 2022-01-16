const router = require('express-promise-router')();
const user = require('./user');
const specialty = require('./specialty');
const student = require('./student');
const group = require('./group');

router.use('/api/users', user);
router.use('/api/groups', group);
router.use('/api/students', student);
router.use('/api/specialties', specialty);

router.get('/', (req, res) => {
    res.sendFile('index.html');
});

module.exports = router;
