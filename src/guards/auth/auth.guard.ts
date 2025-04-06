import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/endpoints/auth/auth.service';
import { AuthDTO } from './auth.guard.dto';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private authService: AuthService) { }

  async canActivate(context: ExecutionContext,) {
    const req: Request = context.switchToHttp().getRequest()

    const access: any = req.headers['access'] ? req.headers['access'] : null
    const refresh: any = req.headers['refresh'] ? req.headers['refresh'] : null



    if (!access && !refresh) return false
    try {


      const payload: AuthDTO = await this.jwtService.verifyAsync(access.split(' ')[1], { secret: process.env.JWT_SECRET })
      req['user'] = {
        id: payload.id,
        email: payload.email
      }

      return true

    } catch (error) {


      if (!refresh) return false

      try {

        const payload: AuthDTO = await this.jwtService.verifyAsync(refresh.split(' ')[1], { secret: process.env.JWT_SECRET })
     
      
        const new_access = await this.authService.generateTokens({ id: payload.id, email: payload.email })
  
        req['user'] = {
          id: payload.id,
          email: payload.email,
          access: new_access.access
        }
        return true
      } catch (error) {
        return false
      }
    }
    
  }
}
