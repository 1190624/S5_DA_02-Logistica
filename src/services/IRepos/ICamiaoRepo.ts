import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camião/Camiao";
import { Matricula } from "../../domain/camião/Matricula";

export default interface ICamiaoRepo extends Repo<Camiao> {
  save(camiao: Camiao): Promise<Camiao>;
  findByDomainMatricula (matricula: Matricula | string): Promise<Camiao>;  
  findAll(): Promise<Camiao[]>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;

}