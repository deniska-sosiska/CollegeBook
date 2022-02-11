import expressPromiseRouter from 'express-promise-router';
import { GroupController } from '../controllers';

const GroupRouter = expressPromiseRouter();


GroupRouter.route('/:abbreviation').get(GroupController.get);
GroupRouter.route('/').get(GroupController.getAll);
GroupRouter.route('/').post(GroupController.create);
GroupRouter.route('/:id').put(GroupController.update);
GroupRouter.route('/:id').delete(GroupController.delete);

GroupRouter.route('/specialtyID/:specialtyID').get(GroupController.getGroupsBySpecialtyID);

export { GroupRouter };
