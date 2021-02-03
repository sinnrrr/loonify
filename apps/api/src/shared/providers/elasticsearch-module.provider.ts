import { ConfigModule, ConfigService } from '@nestjs/config';

export const elasticsearchModuleProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('elastic'),
};
