import {Result} from '../../core/logic/Result';
import IPlaneamentoDTO from '../../dto/IPlaneamentoDTO';

export default interface IPlaneamentoService {
    criarPlaneamento(heuristica: string, matricula: string, data:string): Promise<Result<IPlaneamentoDTO>> 
}
