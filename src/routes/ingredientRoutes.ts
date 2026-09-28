import { Router } from 'express';
import { IngredientController } from '../controllers/IngredientController';

const router = Router();

router.get('/', IngredientController.index);
router.get('/:id', IngredientController.show);
router.post('/', IngredientController.create);
router.put('/:id', IngredientController.update);
router.delete('/:id', IngredientController.delete);

export { router as ingredientRoutes };
