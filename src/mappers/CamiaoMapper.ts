import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import CamiaoDTO from "../dto/CamiaoDTO";
import { Camiao } from "../domain/camião/Camiao";
import { ICamiaoPersistence } from "../dataschema/ICamiaoPersistence";

export class CamiaoMapper extends Mapper<Camiao> {
  
  public static toDTO(camiao: Camiao): CamiaoDTO {
    return {
        //id: camiao.id.toString(),
        matricula: camiao.matricula.toString(),
        caracteristica: camiao.caracteristica.value,
        autonomia: camiao.autonomia.value,
        capacidadeTransporte: camiao.capacidadeTransporte.value,
        capacidadeBateria: camiao.capacidadeBateria.value,
        tara: camiao.tara.value,
        tempoCarregamento: camiao.tempoCarregamento.value,
        ativo: camiao.ativo
    } as CamiaoDTO;
  }

  public static toDomain (camiao: any | Model<ICamiaoPersistence & Document> ): Camiao {
    const camiaoOrError = Camiao.create(
      camiao,
      new UniqueEntityID(camiao.domainId)
    );

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence (camiao: Camiao): any {
    const res = {
            //domainId: camiao.id.toString(),
            matricula: camiao.matricula.toString(),
            caracteristica: camiao.caracteristica.value,
            autonomia: camiao.autonomia.value,
            capacidadeTransporte: camiao.capacidadeTransporte.value,
            capacidadeBateria: camiao.capacidadeBateria.value,
            tara: camiao.tara.value,
            tempoCarregamento: camiao.tempoCarregamento.value,
            ativo: camiao.ativo
    };
    return res;

    
  }
}