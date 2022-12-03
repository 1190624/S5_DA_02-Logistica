import { NextFunction, Request, Response } from 'express';

export default interface IRotaController {
  createRota(req: Request, res: Response, next: NextFunction);
  getListaRota(req: Request, res: Response, next: NextFunction);
}