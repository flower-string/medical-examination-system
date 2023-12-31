import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CustomCorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', req.header('Origin') || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  }
}