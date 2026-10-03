import { sequelize } from './config/database';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conexão com o Postgree via Supabase realizada com sucesso.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
      console.log(`Health Check disponível em: http://localhost:${PORT}/health`);
    });
  } catch (error: unknown) {
    console.log(
      'Erro ao realizar a conexão com o banco de dados.',
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

main();
