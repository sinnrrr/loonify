import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiry: process.env.JWT_REFRESH_EXPIRY || '1w',
  },
}));
