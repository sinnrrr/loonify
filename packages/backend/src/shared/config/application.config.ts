import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  api: {
    prefix: process.env.API_PREFIX || 'api',
    version: parseInt(process.env.API_VERSION) || 0,
    host: process.env.API_HOST || 'localhost',
    port: parseInt(process.env.API_PORT) || 3333,
  },
  app: {
    name: process.env.APP_NAME || 'Loonify',
    version: process.env.APP_VERSION || '1.0',
  },
}))
