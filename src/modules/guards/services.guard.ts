import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTServiceGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticação não fornecido!');
    }
    
    const jwt = token.split(' ')[1];
    try {
      const payload = this.jwtService.verify(jwt);
      // Armazena o payload do JWT no objeto de requisição para uso posterior
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido!');
    }
  }
}