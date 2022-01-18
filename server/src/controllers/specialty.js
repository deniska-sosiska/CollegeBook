import { genericCrud } from './generic.controller';
import { SpecialtySchema } from '../models';

export const SpecialtyController = {
    ...genericCrud(SpecialtySchema),
};
