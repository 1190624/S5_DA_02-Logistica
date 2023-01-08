import { Service, Inject } from 'typedi';


import { Document, FilterQuery, Model } from 'mongoose';

import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { Matricula } from '../domain/camião/Matricula';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { CamiaoMapper } from '../mappers/CamiaoMapper';
import { Camiao } from '../domain/camião/Camiao';
import IPlaneamentoRepo from '../services/IRepos/IPlaneamentoRepo';
import { IPlaneamentoPersistence } from '../dataschema/IPlaneamentoPersistence';
import { Planeamento } from '../domain/planeamento/planeamento';
import { MatriculaPlaneamento } from '../domain/planeamento/matriculaPlaneamento';
import { PlaneamentoMap } from '../mappers/PlaneamentoMap';

@Service()
export default class PlaneamentoRepo implements IPlaneamentoRepo {
    private models: any;

    constructor(
        @Inject('planeamentoSchema') private planeamentoSchema: Model<IPlaneamentoPersistence & Document>,
    ) { }
  exists(t: Planeamento): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
    
    public async save(p: Planeamento): Promise<Planeamento> {
      const query = {matricula: p.matricula.value, data: p.data.value};
      const pDoc = await this.planeamentoSchema.findOne(query);
  
      try {
        if (pDoc === null) {
          const rawP : any = PlaneamentoMap.toPersistence(p);
          const newPlaneamento = await this.planeamentoSchema.create(rawP);
          return PlaneamentoMap.toDomain(newPlaneamento);
        } else {
          pDoc.matricula = p.matricula.value;
          pDoc.data = p.data.value;
          
  
          await pDoc.save();
          return p;
        }
      } catch (err) {
        throw err;
      }
    }

    public async find(query?: any): Promise<Planeamento[]>{
      const p = await this.planeamentoSchema.find(query);
  
      if (p != null) {
        return (p.map((postRecord) => PlaneamentoMap.toDomain(postRecord)));
      }
      return null;
    }
  }



