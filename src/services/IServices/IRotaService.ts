import { Result } from "../../core/logic/Result";
import IRotaDTO from "../../dto/IRotaDTO";

export default interface IRotaService  {
  createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  getListaRota(): Promise<Result<IRotaDTO[]>>;
}
