import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { Container } from 'typedi'; 

import config from "../../../config";
import IPlaneamentoController from '../../controllers/IControllers/IPlaneamentoController';

const route = Router();

export default (app: Router) => {
  //var express = require('express'); 
//var bodyParser = require('body-parser'); 
///var request = require('request-promise'); 

  app.use('/planeamento', route);
  const ctrl = Container.get(config.controllers.planeamento.name) as IPlaneamentoController;


 

  route.post('',
    celebrate({
      body: Joi.object({
        Heuristica: Joi.string().required(), 
        Matricula: Joi.string().required(), 
        Data: Joi.string().required() 
      })
    }),
    (req, res, next) => ctrl.criarPlaneamento(req, res, next) 
    );


    route.get('',
    celebrate({
      params: Joi.object({
        
      })
    }),
    (req, res, next) => ctrl.getLista(req, res, next));

  };
