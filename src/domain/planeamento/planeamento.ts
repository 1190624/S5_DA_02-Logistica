import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { MatriculaPlaneamento } from "./matriculaPlaneamento";
import { DataPlaneamento } from "./dataPlaneamento";
import { ArmazemPlaneamento } from "./armazemPlaneamento";
import PlaneamentoDTO from "../../dto/IPlaneamentoDTO";
import { Guard } from "../../core/logic/Guard";


interface PlaneamentoProps {
    matricula: MatriculaPlaneamento;
    data: DataPlaneamento;
    //entregas: EntregasPlaneamento[]
    armazem: ArmazemPlaneamento;

}

export class Planeamento extends AggregateRoot<PlaneamentoProps> {
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
        const matriculaAux = MatriculaPlaneamento.create(planeamentoDTO.Matricula);
        const dataAux = DataPlaneamento.create(planeamentoDTO.Data);
        const armazensAux = ArmazemPlaneamento.create(planeamentoDTO.Armazens);


        const p = new Planeamento({
            matricula: matriculaAux.getValue(),
            data: dataAux.getValue(),
            armazem: armazensAux.getValue(),
        }, id);

        return Result.ok<Planeamento>(p);

    }

}