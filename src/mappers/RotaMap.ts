import { Mapper } from '../core/infra/Mapper';
import { Rota } from '../domain/rota/rota';
import IRotaDTO from '../dto/IRotaDTO';
import { Document, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RotaMap extends Mapper<Rota> {
  public static toDTO(rota: Rota): IRotaDTO {
    return {
        rotaId: rota.rotaId.toString(),
        origem: rota.rotaOrigem.origem,
        destino: rota.rotaDestino.destino,
        distancia: rota.rotaDistancia.distancia,
        tempo: rota.rotaTempo.tempo,
        gastoEnergetico: rota.rotaGastoEnergetico.gastoEnergetico,
        tempoCargaExtra: rota.rotaTempoCargaExtra.tempoCargaExtra,
    } as IRotaDTO;
  }

  public static toDomain(rota: any | Model<IRotaPersistence & Document>): Rota {
    const rotaOrError = Rota.create(rota, new UniqueEntityID(rota.domainId));

    rotaOrError.isFailure ? console.log(rotaOrError.error) : '';

    return rotaOrError.isSuccess ? rotaOrError.getValue() : null;
  }

  public static toPersistence(rota: Rota): any {
    const res = {
        rotaId: rota.rotaId.toString(),
        origem: rota.rotaOrigem.origem,
        destino: rota.rotaDestino.destino,
        distancia: rota.rotaDistancia.distancia,
        tempo: rota.rotaTempo.tempo,
        gastoEnergetico: rota.rotaGastoEnergetico.gastoEnergetico,
        tempoCargaExtra: rota.rotaTempoCargaExtra.tempoCargaExtra,
    };
    return res;
  }
}
