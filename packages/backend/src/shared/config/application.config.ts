import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  name: process.env.APP_NAME || 'Loonify',
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: parseInt(process.env.API_VERSION) || 0,
  appVersion: process.env.APP_VERSION || '1.0',
  port: parseInt(process.env.PORT) || 3333,
}));
