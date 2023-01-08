import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface ArmazensPlaneamentoProps {
    value: string;
}

export class ArmazemPlaneamento extends ValueObject<ArmazensPlaneamentoProps>{
    get value(): string {
        return this.props.value;
    }

    public constructor(props: ArmazensPlaneamentoProps) {
        super(props);
    }

    public static create(valor: string): Result<ArmazemPlaneamento> {
        return Result.ok<ArmazemPlaneamento>(new ArmazemPlaneamento({ value: valor }));
    }

    public toString() {
        return String(this.props.value)
    }
}