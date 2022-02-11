import expressPromiseRouter from 'express-promise-router';
import { StudentController } from '../controllers';

const StudentRouter = expressPromiseRouter();


StudentRouter.route('/:id').get(StudentController.get);
StudentRouter.route('/').get(StudentController.getAll);
StudentRouter.route('/registration').post(StudentController.create);
StudentRouter.route('/studentUpdate/:id').put(StudentController.update);
StudentRouter.route('/:id').delete(StudentController.delete);
StudentRouter.route('/studentsByGroup/:groupID').get(StudentController.studentsByGroup);
StudentRouter.route('/studentsUpdate').put(StudentController.studentsUpdate);

export { StudentRouter };
