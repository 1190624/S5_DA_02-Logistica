import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { Container } from 'typedi'; 

import config from "../../../config";
import ICamiaoController from '../../controllers/IControllers/ICamiaoController';

const route = Router();

export default (app: Router) => {
  app.use('/camiao', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;
  
  route.post('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().regex(/[A-Z]{2}-[0-9]{2}-[A-Z]{2}/).required(),
        //matricula: Joi.string().required(),
        caracteristica: Joi.string().required(),
        autonomia: Joi.number().required(),
        capacidadeTransporte: Joi.number().required(),
        capacidadeBateria: Joi.number().required(),
        tara: Joi.number().required(),
        tempoCarregamento: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        caracteristica: Joi.string().required(),
        autonomia: Joi.number().required(),
        capacidadeTransporte: Joi.number().required(),
        capacidadeBateria: Joi.number().required(),
        tara: Joi.number().required(),
        tempoCarregamento: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next));


    route.get('',
    celebrate({
        params: Joi.object({
            //userId: Joi.string().required(),
        })
    }),
    (req, res, next) => ctrl.getListaCamiao(req, res, next));
};