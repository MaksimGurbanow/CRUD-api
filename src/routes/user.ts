import { Request, Response, Router } from 'express';
import { create, get, getById, remove, update } from '../controllers/controllers';
import { User } from '../models/user/type';
import { UserModel } from '../models/user/model';
import { createRouteHandler } from '../types/interface';

const router = Router();

router.get('/', createRouteHandler<User>(get, UserModel))
router.get('/:id', createRouteHandler<User>(getById, UserModel));
router.post('/', createRouteHandler<User>(create, UserModel))
router.put('/', createRouteHandler<User>(update, UserModel))
router.delete('/', createRouteHandler<User>(remove, UserModel))

export {router};

