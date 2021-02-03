import { registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { STORAGE_LOCATION } from '../../constants';

export default registerAs('multer', () => <MulterOptions>{
  dest: process.env.STORAGE_DEST || STORAGE_LOCATION
});
