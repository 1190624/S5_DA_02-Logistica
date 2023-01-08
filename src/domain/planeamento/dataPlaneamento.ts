import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface DataPlaneamentoProps {
    value: string;
}

export class DataPlaneamento extends ValueObject<DataPlaneamentoProps>{
    get value(): string {
        return this.props.value;
    }

    public constructor(props: DataPlaneamentoProps) {
        super(props);
    }

    public static create(valor: string): Result<DataPlaneamento> {
        return Result.ok<DataPlaneamento>(new DataPlaneamento({ value: valor }));
    }

    public toString() {
        return String(this.props.value)
    }
}