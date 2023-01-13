import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import IPlaneamentoService from '../services/IServices/IPlaneamentoService';
import IPlaneamentoController from './IControllers/IPlaneamentoController';
import IPlaneamentoDTO from '../dto/IPlaneamentoDTO';
import { Planeamento } from '../domain/planeamento/planeamento';
import { ParsedQs } from 'qs';
@Service()
export default class PlaneamentoController implements IPlaneamentoController {
	constructor(@Inject(config.services.planeamento.name) private service: IPlaneamentoService) {
	}

	public async criarPlaneamento(req: Request, res: Response, next: NextFunction) {
		try {
			
			const planeamentoOrError = await this.service.criarPlaneamento(req.body.Heuristica, req.body.Matricula, req.body.Data) as Result<IPlaneamentoDTO>;

			if (planeamentoOrError.isFailure) {
				return res.status(400).json(planeamentoOrError.error);
			}

			const planningDTO = planeamentoOrError.getValue();
			return res.status(201).json(planningDTO);
		} catch (e) {
			return next(e);
		}
	}


	async getLista(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction){
        try {
            const listaOrError = await this.service.getListaPlaneamento() as Result<IPlaneamentoDTO[]>

            if (listaOrError.isFailure) {
                return res.status(400).send();
            }

            const posts = listaOrError.getValue();
            res.status(200);
            return  res.json(posts);
        } catch(e) {
            return next(e);
        }
    }
}
