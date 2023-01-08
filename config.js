import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  //databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:d3402fee193c7bbe7d45e63f@vsgate-s1.dei.isep.ipp.pt:10327",

  //databaseURL: process.env.MONGODB_URI || "mongodbserver28",
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    camiao: {
      name: "CamiaoController",
      path: "../controllers/CamiaoController"
    },
    rota:{
      name: "RotaController",
      path: "../controllers/RotaController"
    },
    planeamento:{
      name: "PlaneamentoController",
      path: "../controllers/PlaneamentoController"
    }
    
    
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    camiao:{
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo"
    },
    rota:{
      name: "rotaRepo",
      path: "../repos/rotaRepo"
    }, 
    planeamento:{
      name:"PlaneamentoRepo",
      path: "../repos/planeamentoRepo"
  }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    camiao:{
      name: "CamiaoService",
      path: "../services/CamiaoService"
    },
    rota:{
      name: "RotaService",
      path: "../services/RotaService"
    },
    planeamento:{
      name: "PlaneamentoService",
      path: "../services/PlaneamentoService"
    }
  },
};
