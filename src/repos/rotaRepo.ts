import { Inject, Service } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';
import IRotaRepo from '../services/IRepos/IRotaRepo';
import { RotaId } from '../domain/rota/rotaId';
import { Rota } from '../domain/rota/rota';
import { RotaMap } from '../mappers/RotaMap';
import { Filter } from 'mongodb';
import { executionAsyncResource } from 'async_hooks';
import { Result } from '../core/logic/Result';

@Service()
export default class RotaRepo implements IRotaRepo {
  private models: any;

  constructor(@Inject('rotaSchema') private rotaSchema: Model<IRotaPersistence & Document>) {}
  findByRotaId(rotaId: string | RotaId): Promise<Rota> {
    throw new Error('Method not implemented.');
  }
  update(rota: Rota): Promise<Rota> {
    throw new Error('Method not implemented.');
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  // @ts-ignore
  public async exists(rota: Rota): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = rota.id instanceof RotaId ? (<RotaId>rota.id).toValue() : rota.id;

    const query = { domainId: idX };
    const rotaDoc = await this.rotaSchema.findOne(query as FilterQuery<IRotaPersistence & Document>);

    return !!rotaDoc === true;
  }

  public async save(rota: Rota): Promise<Rota> {
    const query = { rotaId: rota.id.toString() };

    const rotaDoc = await this.rotaSchema.findOne(query);

    try {
      if (rotaDoc === null) {
        const rawRota: any = RotaMap.toPersistence(rota);
        const rotaCreated = await this.rotaSchema.create(rawRota);

        return RotaMap.toDomain(rotaCreated);
      } else {
        //rotaDoc.rotaId = rota.rotaId.toString();
        rotaDoc.rotaOrigem = rota.rotaOrigem.origem;
        rotaDoc.rotaDestino = rota.rotaDestino.destino;
        rotaDoc.rotaDistancia = rota.rotaDistancia.distancia;
        rotaDoc.rotaTempo = rota.rotaTempo.tempo;
        rotaDoc.rotaGastoEnergetico = rota.rotaGastoEnergetico.gastoEnergetico;
        rotaDoc.rotaTempoCargaExtra = rota.rotaTempoCargaExtra.tempoCargaExtra;

        await rotaDoc.save();

        return rota;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Rota[]> {
    const routeArray = await this.rotaSchema.find();

    return routeArray.map(item => RotaMap.toDomain(item));
    /**
    const rotaRecord = await this.rotaSchema.find(Rota);
    return rotaRecord !== null ? rotaRecord.map((postRecord) => RotaMap.toDomain(postRecord)): null
    */
  }
}
