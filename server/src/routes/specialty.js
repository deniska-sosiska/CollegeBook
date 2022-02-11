import expressPromiseRouter from 'express-promise-router';
import { SpecialtyController } from '../controllers';

const SpecialtyRouter = expressPromiseRouter();

SpecialtyRouter.route('/:id').get(SpecialtyController.get);
SpecialtyRouter.route('/').get(SpecialtyController.getAll);
SpecialtyRouter.route('/').post(SpecialtyController.create);
SpecialtyRouter.route('/:id').put(SpecialtyController.update);
SpecialtyRouter.route('/:id').delete(SpecialtyController.delete);

export { SpecialtyRouter };
