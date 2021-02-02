import { ConfigModule, ConfigService } from '@nestjs/config';

export const multerModuleProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('multer'),
};
