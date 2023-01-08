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


 
 /* 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
 
app.post(' ', async function (req, res, next) { 
    var data = { // this variable contains the data you want to send 
      Heuristica: Joi.string().required(), 
      Camiao: Joi.string().required(), 
      Data: Joi.string().required() 
    } 
 
    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:8000/heuristicas/', 
        body: data, 
        json: true // Automatically stringifies the body to JSON 
    }; 
     
    var returndata; 
    var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server 
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable. 
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 
     
    res.send(returndata); 
}); 
*/

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
/*
  route.put('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().regex(/[A-Z]{2}-[0-9]{2}-[A-Z]{2}/).required(),
        //matricula: Joi.string().required(),
        data: Joi.string().required(),
        entregas: Joi.number().required(),
        armazens: Joi.number().required()
      }),
    }),
    //(req, res, next) => ctrl.updateCamiao(req, res, next)
    );


    route.get('',
    celebrate({
        params: Joi.object({
            //userId: Joi.string().required(),
        })
    }),
    //(req, res, next) => ctrl.getListaCamiao(req, res, next)
    );
*/
  };
