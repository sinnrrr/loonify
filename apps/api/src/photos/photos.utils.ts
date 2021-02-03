import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (
  req: any,
  file: { originalname: string; }, callback: (arg0: BadRequestException, arg1: boolean) => void
) => {


  if (!file.originalname.toLocaleLowerCase().match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed'),
      false
    );
  }

  callback(null, true);
};

export const editFileName = (
  req: any,
  file: { originalname: string; }, callback: (arg0: any, arg1: string) => void
) => {
  callback(
    null,
    req.params.postId +
    '_' +
    new Date().getTime() +
    extname(file.originalname)
  );
};
