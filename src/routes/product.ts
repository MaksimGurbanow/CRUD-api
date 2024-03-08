import { Request, Response, Router } from 'express';
import { create, get, getById, remove, update } from '../controllers/controllers';
import { Product } from '../models/product/type';
import { ProductModel } from '../models/product/model';
import { createRouteHandler } from '../types/interface';

const router = Router();

router.get('/', createRouteHandler<Product>(get, ProductModel))
router.get('/:id', createRouteHandler<Product>(getById, ProductModel));
router.post('/', createRouteHandler<Product>(create, ProductModel))
router.put('/:id', createRouteHandler<Product>(update, ProductModel))
router.delete('/:id', createRouteHandler<Product>(remove, ProductModel))

export {router};

