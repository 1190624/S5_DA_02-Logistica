import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";

//import IPlaneamentoService from "./IServices/IPlaneamentoService";

import fetch = require("node-fetch");
import IPlaneamentoDTO from "../dto/IPlaneamentoDTO";
import IPlaneamentoService from "./IServices/IPlaneamentoService";
import { request } from "http";
import IPlaneamentoRepo from "./IRepos/IPlaneamentoRepo";
import { PlaneamentoMap } from "../mappers/PlaneamentoMap";

@Service()
export default class PlaneamentoService implements IPlaneamentoService {
	constructor(@Inject(config.repos.planeamento.name) private pRepo: IPlaneamentoRepo) {
	}

	public async criarPlaneamento(pDTO: IPlaneamentoDTO, heuristica: string): Promise<Result<{ pDTO: IPlaneamentoDTO, token: string }>> {
		try {
			//const date = planningDTO.date.toString().replace(/-/g, "");
			const pDoc = PlaneamentoMap.toDomain(pDTO);
			//let pDoc = (await this.pRepo.find({ matricula: pDTO.matricula, data: pDTO.data }))[0];
			console.log(pDoc);
			
			if (pDoc != null) {
				return Result.fail<{ pDTO: IPlaneamentoDTO, token: string }>("O planeamento já existe com a seguinte data=" + pDoc.data + " e com a seguinte matricula=" + pDoc.matricula);
			}
			console.log(2);
			
			//const url = "http://vs576.dei.isep.ipp.pt:8888/";
			//const url = "http://localhost:8888/";
			const url = "http://127.0.0.1:8000/heuristicas/";
            
			const response =  {
                method: 'POST',
				uri: url,
                body: JSON.stringify({Heuristica: heuristica, Camiao: pDoc.matricula, Data: pDoc.data}),
                json: true 
              };
			  console.log(4);
			  


			  const router = require('express').Router();
			  		router.post(url, (req, res) =>{
						console.log(res);
					})

					module.exports = router;

			//const sendrequest = await request(response);
			//const data = await sendrequest.json();
/*
			const planningOrError = await Planning.create({
				licensePlate: PlanningLicensePlate.create(planningDTO.licensePlate).getValue(),
				date: PlanningDate.create(planningDTO.date).getValue(),
				warehouse: PlanningWarehouse.create(data[1].toString()).getValue()
			});

			*/
			/*
			if (planningOrError.isFailure) {
				return Result.fail<{ planningDTO: IPlanningDTO, token: string }>(planningOrError.errorValue());
			}

			const planningResult = planningOrError.getValue();

			await this.planningRepo.save(planningResult);
			const planningDTOResult = PlanningMap.toDTO(planningResult) as IPlanningDTO;
			return Result.ok<{ planningDTO: IPlanningDTO, token: string }>({
				planningDTO: planningDTOResult,
				token: "Planning created successfully."
			});
            */
		   
		} catch (e) {
			throw e;
		}

		}
		

/*
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({Heuristica: heuristica, Data: pDoc.data}),
                json: true 
              });
              


              if (!response.ok) 
              { 
                  console.error("Error");
              }
              else if (response.statusCode >= 400) {
                  console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage);
              }
              else{
                  onSuccess();
              }

			const res = await fetch(path);
			const data = await res.json();
			*/
/*
			const planningOrError = await Planning.create({
				licensePlate: PlanningLicensePlate.create(planningDTO.licensePlate).getValue(),
				date: PlanningDate.create(planningDTO.date).getValue(),
				warehouse: PlanningWarehouse.create(data[1].toString()).getValue()
			});

			if (planningOrError.isFailure) {
				return Result.fail<{ planningDTO: IPlanningDTO, token: string }>(planningOrError.errorValue());
			}

			const planningResult = planningOrError.getValue();

			await this.planningRepo.save(planningResult);
			const planningDTOResult = PlanningMap.toDTO(planningResult) as IPlanningDTO;
			return Result.ok<{ planningDTO: IPlanningDTO, token: string }>({
				planningDTO: planningDTOResult,
				token: "Planning created successfully."
			});
            */
		   /*
		} catch (e) {
			throw e;
		}
	}
	*/


    
}

