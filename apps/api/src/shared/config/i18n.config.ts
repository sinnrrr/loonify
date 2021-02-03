import { registerAs } from '@nestjs/config';
import { I18nOptions } from 'nestjs-i18n';

export default registerAs('i18n', () => <I18nOptions>{
  fallbackLanguage: 'en',
  parserOptions: {
    path: './i18n',
    watch: true
  }
});
