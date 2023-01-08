import {Result} from '../../core/logic/Result';
import IPlaneamentoDTO from '../../dto/IPlaneamentoDTO';

export default interface IPlaneamentoService {
    criarPlaneamento(pDTO: IPlaneamentoDTO, heuristica: string): Promise<Result<{ pDTO: IPlaneamentoDTO, token: string }>> 
}
