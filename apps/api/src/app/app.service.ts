import { Injectable } from '@nestjs/common';
import { STORAGE_LOCATION } from '../constants';

@Injectable()
export class AppService {
  serveFile(res: any, file: string) {
    res.sendFile(file, { root: STORAGE_LOCATION });
  }
}
