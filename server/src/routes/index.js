import expressPromiseRouter from 'express-promise-router';

import { UserRouter } from './user';
import { SpecialtyRouter } from './specialty';
import { StudentRouter } from './student';
import { GroupRouter } from './group';


const router = expressPromiseRouter();

router.use('/api/users', UserRouter);
router.use('/api/groups', GroupRouter);
router.use('/api/students', StudentRouter);
router.use('/api/specialties', SpecialtyRouter);

router.get('/', (req, res) => {
    res.sendFile('index.html');
});

export { router };
