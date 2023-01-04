import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ICamiaoRepo from './IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import CamiaoDTO from '../dto/CamiaoDTO';
import { CamiaoMapper } from '../mappers/CamiaoMapper';
import { Camiao } from '../domain/camião/Camiao';
import { Matricula } from '../domain/camião/Matricula';
import { Caracteristica } from '../domain/camião/Caracteristica';
import { Autonomia } from '../domain/camião/Autonomia';
import { CapacidadeBateria } from '../domain/camião/CapacidadeBateria';
import { CapacidadeTransporte } from '../domain/camião/CapacidadeTransporte';
import { Tara } from '../domain/camião/Tara';
import { TempoCarregamento } from '../domain/camião/TempoCarregamento';

@Service()
export default class CamiaoService implements ICamiaoService {
  constructor(
      @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

    public async criarCamiao(camiaoDTO : CamiaoDTO) : Promise<Result<CamiaoDTO>> {
      try {
        camiaoDTO.ativo = true;
        const result = await Camiao.create(camiaoDTO);


        if (result.isFailure)
          return Result.fail<CamiaoDTO>(result.errorValue());

        
        const camiaoResult = result.getValue();
        //camiaoResult.ativo = true;
        //console.log(camiaoResult);

        await this.camiaoRepo.save(camiaoResult);

        const camiaoDTOResult = CamiaoMapper.toDTO(camiaoResult) as CamiaoDTO;

        return Result.ok<CamiaoDTO>(camiaoDTOResult);
      } catch (exception) {
        throw exception;
      }
    }

    public async updateCamiao(camiaoDTO: CamiaoDTO): Promise<Result<CamiaoDTO>> {
        try {
            const camiao = await this.camiaoRepo.findByDomainMatricula(camiaoDTO.matricula);
      
            if (camiao === null) {
              return Result.fail<CamiaoDTO>("Camião não encontrado.");
            }
            else {
              //utilizadors[e].email = new UtilizadorEmail({value: utilizadorDTO.novo});
      
              //camiao.matricula= new Matricula(camiaoDTO.matricula);
              camiao.caracteristica= new Caracteristica({value: camiaoDTO.caracteristica});
              camiao.autonomia = new Autonomia({value: camiaoDTO.autonomia});
              camiao.capacidadeBateria = new CapacidadeBateria({value: camiaoDTO.capacidadeBateria});
              camiao.capacidadeTransporte = new CapacidadeTransporte({value: camiaoDTO.capacidadeTransporte});
              camiao.tara = new Tara({value: camiaoDTO.tara});
              camiao.tempoCarregamento = new TempoCarregamento({value: camiaoDTO.tempoCarregamento});
      
              await this.camiaoRepo.save(camiao);
      
              const camiaoDTOResult = CamiaoMapper.toDTO(camiao) as CamiaoDTO;
              return Result.ok<CamiaoDTO>( camiaoDTOResult)
              }
          } catch (e) {
            throw e;
          }
    }


    public async getListaCamiao(): Promise<Result<CamiaoDTO[]>> {
      try {
        const listaCamiao = await this.camiaoRepo.findAll();

        if (listaCamiao == null) {
            return Result.fail<CamiaoDTO[]>("Não existem camiões registados.");
        }

        const resultado = listaCamiao.map((listaCamiao) => CamiaoMapper.toDTO(listaCamiao) as CamiaoDTO);
        return Result.ok<CamiaoDTO[]>(resultado);
    } catch(e) {
        throw e;
    }
      
    }


    
    public async mudarStatus(matricula: string): Promise<Result<CamiaoDTO>>{
      try {
        const camiao = await this.camiaoRepo.findByDomainMatricula(matricula);

        
        if (camiao === null){
          return Result.fail<CamiaoDTO>("Camião não foi encontrado");
        } 

        camiao.ativo = !camiao.ativo;

          await this.camiaoRepo.save(camiao);

          const camiaoDTOResult = CamiaoMapper.toDTO(camiao) as CamiaoDTO;

          return Result.ok<CamiaoDTO>( camiaoDTOResult)

        


  } catch(e){
    throw e;
  }

    }

}