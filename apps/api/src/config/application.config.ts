import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  name: process.env.APP_NAME || 'Loonify',
  prefix: process.env.API_PREFIX || 'api',
  port: parseInt(process.env.PORT, 10) || 3333,
}));
