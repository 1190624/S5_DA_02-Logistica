import { Repo } from '../../core/infra/Repo';
import { RotaId } from '../../domain/rota/rotaId';
import { Rota } from '../../domain/rota/rota';

export default interface IRotaRepo extends Repo<Rota> {
  save(rota: Rota): Promise<Rota>;
  findByRotaId(rotaId: RotaId | string): Promise<Rota>;
  findAll(): Promise<Rota[]>;
  update(rota: Rota): Promise<Rota>;
}
