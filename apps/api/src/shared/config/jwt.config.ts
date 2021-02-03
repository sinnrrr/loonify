import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', () => <JwtModuleOptions>{
  secret: process.env.JWT_SECRET || '123asd123',
  signOptions: { expiresIn: process.env.JWT_EXPIRY || '15m' }
});
