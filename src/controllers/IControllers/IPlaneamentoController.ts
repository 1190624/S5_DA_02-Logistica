import { Request, Response, NextFunction } from 'express';

export default interface IPlaneamentoController  {
  criarPlaneamento(req: Request, res: Response, next: NextFunction);
}