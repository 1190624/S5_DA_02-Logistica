import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import CamiaoDTO from "../../dto/CamiaoDTO";
import { Autonomia } from "./Autonomia";
import { CapacidadeBateria } from "./CapacidadeBateria";
import { CapacidadeTransporte } from "./CapacidadeTransporte";
import { Caracteristica } from "./Caracteristica";
import { Matricula } from "./Matricula";
import { Tara } from "./Tara";
import { TempoCarregamento } from "./TempoCarregamento";


interface CamiaoProps {
    matricula: Matricula
    caracteristica: Caracteristica
    autonomia: Autonomia
    capacidadeTransporte: CapacidadeTransporte
    capacidadeBateria: CapacidadeBateria
    tara: Tara
    tempoCarregamento: TempoCarregamento
    ativo: boolean
}

export class Camiao extends AggregateRoot<CamiaoProps> {
  camiao: Result<Matricula>;
    get id(): UniqueEntityID {
        return this._id;
    }

    get matricula(): Matricula {
        return this.props.matricula;
    }

    get caracteristica(): Caracteristica {
        return this.props.caracteristica;
    }

    get autonomia(): Autonomia {
        return this.props.autonomia;
    }

    get capacidadeTransporte(): CapacidadeTransporte {
        return this.props.capacidadeTransporte;
    }

    get capacidadeBateria(): CapacidadeBateria {
        return this.props.capacidadeBateria;
    }

    get tara(): Tara {
        return this.props.tara;
    }

    get tempoCarregamento(): TempoCarregamento {
        return this.props.tempoCarregamento;
    }

    get ativo(): boolean{
      return this.props.ativo;
    }

    set matricula ( value: Matricula) {
        this.props.matricula = value;
      }

    set caracteristica ( value: Caracteristica) {
      this.props.caracteristica = value;
    }
    
    set autonomia ( value: Autonomia) {
      this.props.autonomia = value;
    }
    
    set capacidadeTransporte ( value: CapacidadeTransporte) {
        this.props.capacidadeTransporte = value;
      }
      set capacidadeBateria ( value: CapacidadeBateria) {
        this.props.capacidadeBateria = value;
      }
      set tara ( value: Tara) {
        this.props.tara = value;
      }

      set tempoCarregamento(value: TempoCarregamento){
        this.props.tempoCarregamento;
      }

      set ativo(value: boolean){
        this.props.ativo = value;
      }


    private constructor(props: CamiaoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(camiaoDTO: CamiaoDTO | any, id?: UniqueEntityID): Result<Camiao> {
        const matriculaAux = new Matricula(camiaoDTO.matricula);
        const caracteristicaAux = Caracteristica.create(camiaoDTO.caracteristica);
        const autonomiaAux = Autonomia.create(camiaoDTO.autonomia);
        const capTransAux = CapacidadeTransporte.create(camiaoDTO.capacidadeTransporte);
        const capBateriaAux = CapacidadeBateria.create(camiaoDTO.capacidadeBateria);
        const taraAux = Tara.create(camiaoDTO.tara);
        const tempoAux = TempoCarregamento.create(camiaoDTO.tempoCarregamento);
        
        const camiao = new Camiao({
            matricula: matriculaAux,
            caracteristica: caracteristicaAux.getValue(),
            autonomia: autonomiaAux.getValue(),
            capacidadeTransporte: capTransAux.getValue(),
            capacidadeBateria: capBateriaAux.getValue(),
            tara: taraAux.getValue(),
            tempoCarregamento: tempoAux.getValue(),
            ativo: camiaoDTO.ativo
        }, id);

        return Result.ok<Camiao>(camiao);

    }
}