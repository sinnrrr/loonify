import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('typeorm', () => <TypeOrmModuleOptions>{
  type: process.env.POSTGRES_DRIVER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASS || 'root',
  database: process.env.POSTGRES_NAME || 'loonify',
  autoLoadEntities: true,
  synchronize: true,
  logging: ["error", "warn", "info"],
  ssl: {
    rejectUnauthorized: false
  }
});
