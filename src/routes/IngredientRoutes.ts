import { Router } from 'express';
import { IngredientController } from '../controllers/IngredientController';

const router = Router();

/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: Listagem de ingredientes
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Lista de ingredientes retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', IngredientController.index);

/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     summary: Busca de ingrediente por id
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id do ingrediente
 *     responses:
 *       200:
 *         description: Ingrediente encontrado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', IngredientController.show);

/**
 * @openapi
 * /ingredients:
 *   post:
 *     summary: Criação de ingredientes
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - description
 *               - expiration
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camomila
 *               price:
 *                 type: number
 *                 example: 12.50
 *               stock:
 *                 type: integer
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: Flor seca de camomila para chás calmantes
 *               expiration:
 *                 type: string
 *                 format: date
 *                 example: '2027-06-15'
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', IngredientController.create);

/**
 * @openapi
 * /ingredients/{id}:
 *   put:
 *     summary: Atualização de ingrediente
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - description
 *               - expiration
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               expiration:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Ingrediente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', IngredientController.update);

/**
 * @openapi
 * /ingredients/{id}:
 *   delete:
 *     summary: Remoção de ingrediente
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingrediente removido com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', IngredientController.delete);

export { router as IngredientRoutes };
