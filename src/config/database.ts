import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const useSSL = process.env.DB_SSL === 'true';

const sequelizeOptions: Options = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  logging: false,
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  define: {
    underscored: true, // Apenas preferência pessoal: snake_case >>> camelCase
    timestamps: true,
  },
};

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_User || 'postgres',
  process.env.DB_PASSWORD || '',
  sequelizeOptions,
);

sequelize
  .authenticate()
  .then(() => console.log('DB conectado com sucesso'))
  .catch((err) => console.error('Conexão com DB falhou', err.message));
