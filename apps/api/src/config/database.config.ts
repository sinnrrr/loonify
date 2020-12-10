import { registerAs } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export default registerAs('database', () => <TypeOrmModuleAsyncOptions>{
  type: process.env.DB_DRIVER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'loonify',
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false
  }
});
