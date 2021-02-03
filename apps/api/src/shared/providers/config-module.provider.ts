import jwtConfiguration from '../config/jwt.config';
import i18nConfiguration from '../config/i18n.config';
import multerConfiguration from '../config/multer.config';
import swaggerConfiguration from '../config/swagger.config';
import typeormConfiguration from '../config/typeorm.config';
import applicationConfiguration from '../config/application.config';

export const configModuleProvider = {
  envFilePath: '../.env',
  cache: true,
  load: [
    jwtConfiguration,
    i18nConfiguration,
    multerConfiguration,
    swaggerConfiguration,
    typeormConfiguration,
    applicationConfiguration,
  ],
}
