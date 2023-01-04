import { Autonomia } from "../domain/camião/Autonomia";
import { CapacidadeBateria } from "../domain/camião/CapacidadeBateria";
import { CapacidadeTransporte } from "../domain/camião/CapacidadeTransporte";
import { Caracteristica } from "../domain/camião/Caracteristica";
import { Matricula } from "../domain/camião/Matricula";
import { Tara } from "../domain/camião/Tara";
import { TempoCarregamento } from "../domain/camião/TempoCarregamento";

export interface ICamiaoPersistence {
    //_id: number,
    matricula: Matricula;
    caracteristica: Caracteristica;
    autonomia: Autonomia;
    capacidadeTransporte: CapacidadeTransporte;
    capacidadeBateria: CapacidadeBateria;
    tara: Tara;
    tempoCarregamento: TempoCarregamento;
    ativo: boolean;
  }