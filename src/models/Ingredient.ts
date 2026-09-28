import { sequelize } from '../config/database';
import { Model, DataTypes, Optional } from 'sequelize';

export interface IngredientAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  expiration: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IngredientCreationAttributes = Optional<
  IngredientAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export class Ingredient
  extends Model<IngredientAttributes, IngredientCreationAttributes>
  implements IngredientAttributes
{
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare description: string;
  declare expiration: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ingredients',
    timestamps: true,
    underscored: true,
  },
);
