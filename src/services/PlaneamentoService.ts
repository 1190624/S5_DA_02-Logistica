import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";

//import IPlaneamentoService from "./IServices/IPlaneamentoService";

import fetch = require("node-fetch");
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import IPlaneamentoService from "./IServices/IPlaneamentoService";
import IPlaneamentoRepo from "./IRepos/IPlaneamentoRepo";
import { PlaneamentoMap } from "../mappers/PlaneamentoMap";
import { Planeamento } from "../domain/planeamento/planeamento";

@Service()
export default class PlaneamentoService implements IPlaneamentoService {
	constructor(@Inject(config.repos.planeamento.name) private pRepo: IPlaneamentoRepo) {
	}

	public async criarPlaneamento(heuristica: string, m:string, dataHoje: string): Promise<Result<IPlaneamentoDTO>> {
			
		try {
			//Planeamento p = Planeamento.create({ matricula: matricula, data, armazens });

			//const pDoc = PlaneamentoMap.toDomain(pDTO);
			//console.log(pDoc.data);
			
			let planeamento = (await this.pRepo.find({ matricula: m}))[0];
		
			
			if (planeamento != null) {
				return Result.fail<IPlaneamentoDTO>("O planeamento já existe.");
			}
			console.log(2);
		
			//const url = 'http://127.0.0.1:8000/heuristicas/';
			const url = '213.22.149.37:8000';
			  //console.log(pDoc.matricula);
			  //console.log(pDoc.data);
			  
			  


			  const res = await fetch(url, {
					method: 'POST',
      				body: JSON.stringify(
						{
						Heuristica: heuristica, 
						Camiao: m, 
						Data: dataHoje
					}),
					headers: {'Content-Type': 'application/json', Accept: 'application/json'}
    			});
				

				const data = await res.text();
				var splitData = data.split('[');
				var newSplit = splitData[1].split(']');
				var caminho = newSplit[0].replace(/'/g, "")
				//
				console.log(newSplit[0].replace(/'/g, ""));

				const dto = <IPlaneamentoDTO>({
					Matricula: m,
					Data: dataHoje,
					Armazens: caminho 
				});
				
				const newPlaneamento = PlaneamentoMap.toDomain(dto);
				console.log("newPlaneamento");
				console.log(newPlaneamento.matricula.props.value);
				
				const tmp = await this.pRepo.save(newPlaneamento);
				console.log(tmp);

				const pDTOResult = PlaneamentoMap.toDTO(newPlaneamento) as IPlaneamentoDTO;
		console.log(pDTOResult);
		
				return Result.ok<IPlaneamentoDTO>(pDTOResult);
				
			} catch (e) {
				throw e;
			  }

			}
				
			public async getListaPlaneamento(): Promise<Result<IPlaneamentoDTO[]>> {
				try {
				  const lista = await this.pRepo.findAll();
		  
				  if (lista == null) {
					  return Result.fail<IPlaneamentoDTO[]>("Não existem planeamentos registados.");
				  }
		  
				  const resultado = lista.map((lista) => PlaneamentoMap.toDTO(lista) as IPlaneamentoDTO);
				  return Result.ok<IPlaneamentoDTO[]>(resultado);
			  } catch(e) {
				  throw e;
			  }
				
			  }
		



  
    
}

