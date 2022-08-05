import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtDecrypt } from 'src/utils/jwt.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<any>();
    const uuid = req.params.uuid;
    const token = req.headers.authorization;

    if (jwtDecrypt(token, uuid)) {
      return true;
    } else {
      throw new HttpException('无效签证', 403);
    }
  }
}
