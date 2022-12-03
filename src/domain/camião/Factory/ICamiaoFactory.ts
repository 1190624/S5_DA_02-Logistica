import { Camiao } from "../Camiao";


export interface ICamiaoFactory {
    criarCamiao(matricula: string, 
        caracteristica: string, 
        autonomia: number, 
        capacidadeTransporte: number, 
        capacidadeBateria: number, 
        tara: number, 
        tempoCarregamento: string): Camiao
}
