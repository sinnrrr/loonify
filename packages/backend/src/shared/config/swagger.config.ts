import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'Loonify',
  description: process.env.SWAGGER_DESCRIPTION || 'Swagger-styled OpenAPI specifications',
  version: process.env.SWAGGER_VERSION || '1.0',
  prefix: process.env.SWAGGER_PREFIX || 'docs'
}));
