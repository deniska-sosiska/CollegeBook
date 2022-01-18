import expressPromiseRouter from 'express-promise-router';
import { UserController } from '../controllers';

const UserRouter = expressPromiseRouter();

UserRouter.route('/:id').get(UserController.get);
UserRouter.route('/').get(UserController.getAll);
UserRouter.route('/registration').post(UserController.create);
UserRouter.route('/:id').put(UserController.update);
UserRouter.route('/:id').delete(UserController.delete);
UserRouter.route('/authentication').post(UserController.authentication);

export { UserRouter };
