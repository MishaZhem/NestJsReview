import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { config } from '../config';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-admin-token'];

    console.log(`Admin access attempt with token: ${token}`);

    if (token && token !== config.adminToken) {
      return false;
    }
    return true;
  }
}
