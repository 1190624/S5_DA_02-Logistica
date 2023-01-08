import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Planeamento } from "../domain/planeamento/planeamento";
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import { IPlaneamentoPersistence } from "../dataschema/IPlaneamentoPersistence";

export class PlaneamentoMap extends Mapper<Planeamento> {
  
  public static toDTO(p: Planeamento): IPlaneamentoDTO {
    return {

        matricula: p.matricula.props.value,
        data: p.data.props.value,
        armazens: p.armazem.props.value
    } as IPlaneamentoDTO;
  }


  public static toDomain (p: any | Model<IPlaneamentoPersistence & Document> ): Planeamento {
    const pOrError = Planeamento.create(
      p,
      new UniqueEntityID(p.domainId)
    );

    pOrError.isFailure ? console.log(pOrError.error) : '';

    return pOrError.isSuccess ? pOrError.getValue() : null;
  }

  public static toPersistence (p: Planeamento): any {
    const res = {
            matricula: p.matricula.value,
            data: p.data.value,
            armazem: p.armazem.value,

    };
    return res;

    
  }
  
}