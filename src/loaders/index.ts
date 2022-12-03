import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import camiaoSchema from '../persistence/schemas/camiaoSchema';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const camiaoSchema = {
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema'}

  const rotaSchema = {
    // compare with the approach followed in repos and services
    name: 'rotaSchema',
    schema: '../persistence/schemas/rotaSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path}
  const rotaController = {
    name: config.controllers.rota.name,
    path: config.controllers.rota.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const rotaRepo = {
    name: config.repos.rota.name,
    path: config.repos.rota.path
  }

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }


  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const rotaService = {
    name: config.services.rota.name,
    path: config.services.rota.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      rotaSchema,
      camiaoSchema
    ],
    controllers: [
      roleController,
      camiaoController,
      rotaController
    ],
    repos: [
      roleRepo,
      userRepo,
      camiaoRepo,
      rotaRepo
    ],
    services: [
      roleService,
      camiaoService,
      rotaService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
