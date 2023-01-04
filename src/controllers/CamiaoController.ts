import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import ICamiaoController from './IControllers/ICamiaoController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ICamiaoService from '../services/IServices/ICamiaoService';
import CamiaoDTO from '../dto/CamiaoDTO';

@Service()
export default class CamiaoController implements ICamiaoController /* TODO: extends ../core/infra/BaseController */ {
    
    constructor(
        @Inject(config.services.camiao.name) private camiaoServiceInstance : ICamiaoService
    ) {}
    
    public async createCamiao(request: Request, response: Response, next: NextFunction) {
        try {
    
            const result = await this.camiaoServiceInstance.criarCamiao(request.body as CamiaoDTO) as Result<CamiaoDTO>;

            if (result.isFailure)
                return response.status(402).send();

            const camiaoDTO = result.getValue();
            
            return response.json(camiaoDTO).status(201);
        } catch (exception) {
            return next(exception);
        }
    }
    
    async updateCamiao(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as CamiaoDTO) as Result<CamiaoDTO>;
      
            if (camiaoOrError.isFailure) {
              return res.status(404).send();
            }
      
            const camiaoDTO = camiaoOrError.getValue();
            return res.status(201).json(camiaoDTO);
          }
          catch (e) {
            return next(e);
          }
        }


    
    async getListaCamiao(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction){
        try {
            const listaCamiaoOrError = await this.camiaoServiceInstance.getListaCamiao() as Result<CamiaoDTO[]>

            if (listaCamiaoOrError.isFailure) {
                return res.status(400).send();
            }

            const camiaoPosts = listaCamiaoOrError.getValue();
            res.status(200);
            return  res.json(camiaoPosts);
        } catch(e) {
            return next(e);
        }
    }


    async mudarStatus(req: Request, res: Response, next: NextFunction){
        try {
            const matricula = req.query.matricula;
            const novo = await this.camiaoServiceInstance.mudarStatus(matricula as string) as Result<CamiaoDTO>;

            if (novo.isFailure) {
                return res.status(400).send();
            }

            const camiaoPosts = novo.getValue();
            res.status(200);
            return  res.json(camiaoPosts);
        } catch(e) {
            return next(e);
        }
    }

}