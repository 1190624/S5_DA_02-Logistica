import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { Container } from 'typedi'; 

import config from "../../../config";
import IRotaController from '../../controllers/IControllers/IRotaController';

const route = Router();

export default (app: Router) => {
  app.use('/rota', route);

  const ctrl = Container.get(config.controllers.rota.name) as IRotaController;
  route.post('',
    celebrate({
      body: Joi.object({
        rotaId: Joi.string().required(),
        origem: Joi.string().required(),
        destino: Joi.string().required(),
        distancia: Joi.number().required(),
        tempo: Joi.string().required(),
        gastoEnergetico: Joi.number().required(),
        tempoCargaExtra: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRota(req, res, next) );

    route.get('',
    celebrate({
        params: Joi.object({
        })
    }),
    (req, res, next) => ctrl.getListaRota(req, res, next));

};