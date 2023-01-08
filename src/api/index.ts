import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import camiao from './routes/camiaoRoute';
import rota from './routes/rotaRoute';
import planeamento from './routes/planeamentoRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	camiao(app);
	rota(app);
	planeamento(app);
	
	return app
}