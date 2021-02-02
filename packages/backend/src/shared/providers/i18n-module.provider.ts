import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nJsonParser, QueryResolver } from 'nestjs-i18n';

export const i18nModuleProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('i18n'),
  parser: I18nJsonParser,
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    AcceptLanguageResolver,
  ],
};
