import { Service, Inject } from 'typedi';


import { Document, FilterQuery, Model } from 'mongoose';

import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { Matricula } from '../domain/camião/Matricula';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { CamiaoMapper } from '../mappers/CamiaoMapper';
import { Camiao } from '../domain/camião/Camiao';

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
    private models: any;

    constructor(
        @Inject('camiaoSchema') private camiaoSchema: Model<ICamiaoPersistence & Document>,
    ) { }


    public async findAll(): Promise<Camiao[]> {
        const routeArray = await this.camiaoSchema.find();

        return routeArray.map(item => CamiaoMapper.toDomain(item));
        /**
        const camiaoRecord = await this.camiaoSchema.find(Camiao);
        return camiaoRecord !== null ? camiaoRecord.map((camiaoRecord) => CamiaoMapper.toDomain(camiaoRecord)): null
        */  
    }


    public async findByDomainMatricula(matricula: string | Matricula): Promise<Camiao> {
        const query = { matricula : matricula.toString()};
        const camiaoRecord = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document> );
    
        if( camiaoRecord != null) {
          return CamiaoMapper.toDomain(camiaoRecord);
        }
        else
          return null;
    }


    public async exists(t: Camiao): Promise<boolean> {
        const idX = t.matricula instanceof Matricula ? (<Matricula>t.matricula).toValue() : t.matricula;

        const query = { domainId: idX };
        const camiaoDocument = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);

        return !!camiaoDocument === true;
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }
 
    public async save(camiao: Camiao): Promise<Camiao> {
        const query = { matricula : camiao.id }; 
    
        const camiaoDoc = await this.camiaoSchema.findOne(query);
    
        try {
          if (camiaoDoc === null) {
            const rawCamiao: any = CamiaoMapper.toPersistence(camiao);
            const camiaoCreated = await this.camiaoSchema.create(rawCamiao);
    
            return CamiaoMapper.toDomain(camiaoCreated);
          } else {

            //camiaoDoc.matricula = camiao.matricula.value;
            camiaoDoc.caracteristica = camiao.caracteristica.value;
            camiaoDoc.autonomia = camiao.autonomia.value;
            camiaoDoc.capacidadeTransporte = camiao.capacidadeTransporte.value;
            camiaoDoc.capacidadeBateria = camiao.capacidadeBateria.value;
            camiaoDoc.tara = camiao.tara.value;
            camiaoDoc.tempoCarregamento = camiao.tempoCarregamento.value; 
            
            await camiaoDoc.save();
    
            return camiao;
          }
        } catch (err) {
          throw err;
        }
      }
}