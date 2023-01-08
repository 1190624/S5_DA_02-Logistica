import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { MatriculaPlaneamento } from "./matriculaPlaneamento";
import { DataPlaneamento } from "./dataPlaneamento";
import { ArmazemPlaneamento } from "./armazemPlaneamento";
import PlaneamentoDTO from "../../dto/IPlaneamentoDTO";


interface PlaneamentoProps {
    matricula: MatriculaPlaneamento
    data: DataPlaneamento
    //entregas: EntregasPlaneamento[]
    armazem: ArmazemPlaneamento

}

export class Planeamento extends AggregateRoot<PlaneamentoProps> {
    p: Result<MatriculaPlaneamento>;
    get id(): UniqueEntityID {
        return this._id;
    }

    get matricula(): MatriculaPlaneamento {
        return this.props.matricula;
    }

    get data(): DataPlaneamento {
        return this.props.data;
    }

    get armazem(): ArmazemPlaneamento {
        return this.props.armazem;
    }

  

    private constructor(props: PlaneamentoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(planeamentoDTO: PlaneamentoDTO | any, id?: UniqueEntityID): Result<Planeamento> {
        
        const matriculaAux = new MatriculaPlaneamento(planeamentoDTO.matricula);
        const dataAux = DataPlaneamento.create(planeamentoDTO.data);
        const armazensAux = ArmazemPlaneamento.create(planeamentoDTO.armazens);
        
        const p = new Planeamento({
            matricula: matriculaAux,
            data: dataAux.getValue(),
            armazem: armazensAux.getValue(),
        }, id);

        return Result.ok<Planeamento>(p);

    }
}