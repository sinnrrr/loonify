import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeormModuleProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('typeorm'),
};
