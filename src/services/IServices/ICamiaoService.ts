import { Result } from "../../core/logic/Result";
import CamiaoDTO from "../../dto/CamiaoDTO";

export default interface ICamiaoService  {
  criarCamiao(roleDTO: CamiaoDTO): Promise<Result<CamiaoDTO>>;
  updateCamiao(camiaoDTO: CamiaoDTO): Promise<Result<CamiaoDTO>>;
  getListaCamiao(): Promise<Result<CamiaoDTO[]>>;
  mudarStatus(matricula: string): Promise<Result<CamiaoDTO>>;
}