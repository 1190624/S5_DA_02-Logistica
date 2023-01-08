import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface MatriculaPlaneamentoProps {
    value: string;
}

export class MatriculaPlaneamento extends ValueObject<MatriculaPlaneamentoProps>{
    get value(): string {
        return this.props.value;
    }

    public constructor(props: MatriculaPlaneamentoProps) {
        super(props);
    }

    public static create(valor: string): Result<MatriculaPlaneamento> {
        return Result.ok<MatriculaPlaneamento>(new MatriculaPlaneamento({ value: valor }));
    }

    public toString() {
        return String(this.props.value)
    }
}