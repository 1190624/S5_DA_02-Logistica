import { Inject, Service } from 'typedi';
import IRotaController from './IControllers/IRotaController';
import config from '../../config';
import IRotaService from '../services/IServices/IRotaService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IRotaDTO from '../dto/IRotaDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class RotaController implements IRotaController {
    constructor(@Inject(config.services.rota.name) private rotaServiceInstance: IRotaService) {}
  
    public async createRota(req: Request, res: Response, next: NextFunction) {

      try {
        const rotaOrError = (await this.rotaServiceInstance.createRota(req.body as IRotaDTO)) as Result<IRotaDTO>;
        
        if (rotaOrError.isFailure) {
          return res.status(402).send();
        }
        
        const rotaDTO = rotaOrError.getValue();
        return res.json(rotaDTO).status(201);
      } catch (e) {
        return next(e);
      }
    }

    async getListaRota(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction){
      try {
          const listaRotaOrError = await this.rotaServiceInstance.getListaRota() as Result<IRotaDTO[]>

          if (listaRotaOrError.isFailure) {
              return res.status(400).send();
          }

          const rotaPosts = listaRotaOrError.getValue();
          res.status(200);
          return  res.json(rotaPosts);
      } catch(e) {
          return next(e);
      }
  }





}