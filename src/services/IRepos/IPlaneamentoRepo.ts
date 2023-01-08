import { Repo } from "../../core/infra/Repo";
import { Planeamento } from "../../domain/planeamento/planeamento";

export default interface IPlaneamentoRepo extends Repo<Planeamento> {
  save(p: Planeamento): Promise<Planeamento>;
  find(query?: any): Promise<Planeamento[]>;
}