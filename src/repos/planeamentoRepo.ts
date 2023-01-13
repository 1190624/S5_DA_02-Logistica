import { Service, Inject } from 'typedi';


import { Document, FilterQuery, Model } from 'mongoose';

import IPlaneamentoRepo from '../services/IRepos/IPlaneamentoRepo';
import { IPlaneamentoPersistence } from '../dataschema/IPlaneamentoPersistence';
import { Planeamento } from '../domain/planeamento/planeamento';
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
    /*
    public async save(p: Planeamento): Promise<Planeamento> {
      const query = {matricula: p.matricula.value};
      const pDoc = await this.planeamentoSchema.findOne(query);
  
      try {
        if (pDoc === null) {
          const rawP : any = PlaneamentoMap.toPersistence(p);
          const newPlaneamento = await this.planeamentoSchema.create(rawP);
          return PlaneamentoMap.toDomain(newPlaneamento);
        } else {
          pDoc.matricula = p.matricula.value;
          //pDoc.data = p.data.value;
          
          await pDoc.save();
          return p;
        }
      } catch (err) {
        throw err;
      }
    }
*/

    public async save(p: Planeamento): Promise<Planeamento> {
      //const query = { matricula : camiao.id }; 
      const query = { matricula : p.matricula.toString()}; 
      const pDoc = await this.planeamentoSchema.findOne(query);
  
      try {
        if (pDoc === null) {
          const raw: any = PlaneamentoMap.toPersistence(p);
          const created = await this.planeamentoSchema.create(raw);
  
          return PlaneamentoMap.toDomain(created);
        } else {

          //camiaoDoc.matricula = camiao.matricula.value;
          pDoc.matricula = p.matricula.value;
          pDoc.data = p.data.value;
          pDoc.armazens = p.armazem.value;
      

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



