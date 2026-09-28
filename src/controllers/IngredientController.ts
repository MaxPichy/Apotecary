import { Request, Response } from 'express';
import { Ingredient } from '../models/Ingredient';

export class IngredientController {
  // GET -> todos os ingredientes - okye
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const ingredients = await Ingredient.findAll({
        attributes: [
          'id',
          'name',
          'price',
          'description',
          'stock',
          'expiration',
          'createdAt',
          'updatedAt',
        ],
      });

      return res.status(200).json(ingredients);
    } catch (error: unknown) {
      // Erro servidor
      return res.status(500).json({
        error: 'Erro ao listar ingredientes.',
        detail: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // GET -> ingrediente único - okye
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      // Tratativa id inválido
      if (isNaN(id) || id < 0) {
        return res.status(400).json({ error: 'ID inválido.' });
      }

      const ingredient = await Ingredient.findByPk(id, {
        attributes: [
          'name',
          'price',
          'description',
          'stock',
          'expiration',
          'createdAt',
          'updatedAt',
        ],
      });

      // Tratativa ingrediente inexistente
      if (!ingredient) {
        return res.status(404).json({ error: 'Ingrediente inexistente.' });
      }

      return res.status(200).json(ingredient);
    } catch (error: unknown) {
      // Erro servidor
      return res.status(500).json({
        error: 'Erro ao buscar ingrediente.',
        detail: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // POST -> criar ingrediente
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, stock, description, expiration } = req.body;

      // Tratativa nome
      if (!name || name == null) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
      } else if (typeof name !== 'string' || name.trim() == '') {
        return res.status(400).json({ error: 'Nome inválido.' });
      }

      // Tratativa preço
      if (!price) {
        return res.status(400).json({ error: 'O campo preço é obrigatório.' });
      } else if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Preço inválido.' });
      }

      // Tratativa estoque
      if (!stock || stock == null) {
        return res.status(400).json({ error: 'O campo estoque é obrigatório.' });
      } else if (typeof stock !== 'number' || Number.isInteger(stock) == false) {
        return res.status(400).json({ error: 'Estoque inválido.' });
      }

      // Tratativa descrição
      if (!description || description == null) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
      } else if (typeof description !== 'string' || description.trim() == '') {
        return res.status(400).json({ error: 'Descrição inválida.' });
      }

      // Tratativa validade
      const expiration_regex = /^\d{4}-\d{2}-\d{2}$/;

      if (!expiration || expiration == null) {
        return res.status(400).json({ error: 'O campo validade é obrigatório.' });
      } else if (!expiration_regex.test(expiration.trim())) {
        return res.status(400).json({ error: 'Validade inválida.' });
      }

      const ingredient = await Ingredient.create({
        name: name.trim(),
        price: Number(price.toFixed(2)),
        stock: stock,
        description: description.trim(),
        expiration: expiration.trim(),
      });

      return res.status(201).json(ingredient);
    } catch (error: unknown) {
      // Erro servidor
      return res.status(500).json({
        error: 'Erro ao criar ingrediente.',
        detail: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // PUT -> atualizar ingrediente - okye
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const { name, price, stock, description, expiration } = req.body;

      // Tratativa id inválido
      if (isNaN(id) || id < 0) {
        return res.status(400).json({ error: 'ID inválido.' });
      }

      const ingredient = await Ingredient.findByPk(id);

      // Tratativa id inexistente
      if (!ingredient) {
        return res.status(404).json({ error: 'ID inexistente.' });
      }

      // Tratativa nome
      if (!name || name == null) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
      } else if (typeof name !== 'string' || name.trim() == '') {
        return res.status(400).json({ error: 'Nome inválido.' });
      }

      const name_in_use = await Ingredient.findOne({
        where: { name: name.trim() },
      });
      if (name_in_use && name_in_use.id !== id) {
        return res.status(400).json({ error: 'Ingrediente já existe.' });
      } else {
        ingredient.name = name.trim();
      }

      // Tratativa preço
      if (!price) {
        return res.status(400).json({ error: 'O campo preço é obrigatório.' });
      } else if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Preço inválido.' });
      } else {
        ingredient.price = Number(price.toFixed(2));
      }

      // Tratativa estoque
      if (!stock || stock == null) {
        return res.status(400).json({ error: 'O campo estoque é obrigatório.' });
      } else if (typeof stock !== 'number' || Number.isInteger(stock) == false) {
        return res.status(400).json({ error: 'Estoque inválido.' });
      } else {
        ingredient.stock = stock;
      }

      // Tratativa descrição
      if (!description || description == null) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
      } else if (typeof description !== 'string' || description.trim() == '') {
        return res.status(400).json({ error: 'Descrição inválida.' });
      } else {
        ingredient.description = description.trim();
      }

      // Tratativa validade
      const expiration_regex = /^\d{4}-\d{2}-\d{2}$/;

      if (!expiration || expiration == null) {
        return res.status(400).json({ error: 'O campo validade é obrigatório.' });
      } else if (!expiration_regex.test(expiration.trim())) {
        return res.status(400).json({ error: 'Validade inválida.' });
      } else {
        ingredient.expiration = expiration;
      }

      await ingredient.save();

      return res.status(200).json(ingredient);
    } catch (error: unknown) {
      // Erro servidor
      return res.status(500).json({
        error: 'Erro ao atualizar ingrediente.',
        detail: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // DELETE -> deletar ingrediente - okye
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      // Tratativa id inválido
      if (isNaN(id) || id < 0) {
        return res.status(400).json({ error: 'ID inválido.' });
      }

      const ingredient = await Ingredient.findByPk(id);

      // Tratativa id inexistente
      if (!ingredient) {
        return res.status(404).json({ error: 'ID inexistente.' });
      }

      await ingredient.destroy();

      return res.status(204).send();
    } catch (error: unknown) {
      // Erro servidor
      return res.status(500).json({
        error: 'Erro ao deletar ingrediente.',
        detail: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
