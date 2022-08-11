import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
@Controller('file')
export class FileController {
  @Post('/uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination(req, file, callback) {
          callback(null, 'public/image');
        },
        filename(req, file, callback) {
          file.originalname = unescape(file.originalname);
          const fileInfo = file.originalname.split('.');
          const fileSuffix = fileInfo.pop();
          const fileName = fileInfo.join('.') + '.' + Date.now();
          callback(null, `${fileName}.${fileSuffix}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      code: 200,
      url: 'http://localhost:3001/static/image/' + file.filename,
    };
  }
}
