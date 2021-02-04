import jwtConfiguration from '../config/jwt.config';
import multerConfiguration from '../config/multer.config';
import swaggerConfiguration from '../config/swagger.config';
import typeormConfiguration from '../config/typeorm.config';
import applicationConfiguration from '../config/application.config';

export const configModuleProvider = {
  envFilePath: '../../../.env',
  cache: true,
  load: [
    jwtConfiguration,
    multerConfiguration,
    swaggerConfiguration,
    typeormConfiguration,
    applicationConfiguration,
  ],
}
