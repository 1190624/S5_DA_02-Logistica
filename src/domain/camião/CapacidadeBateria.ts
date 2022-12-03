import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface CapacidadeBateriaProps {
    value: number;
}

export class CapacidadeBateria extends ValueObject<CapacidadeBateriaProps>{
    get value(): number {
        return this.props.value;
    }

    public constructor(props: CapacidadeBateriaProps) {
        super(props);
    }

    public static create(valor: number): Result<CapacidadeBateria> {
        const CAPACIDADE_BATERIA_MIN = 55;

        if (valor < CAPACIDADE_BATERIA_MIN)
        return Result.fail("Capacidade da Bateria do Camião Elétrico é inferior ao minímo estipulado!");
            //throw new BusinessRuleValidationException("Capacidade da Bateria do Camião Elétrico é inferior ao minímo estipulado (" + CAPACIDADE_BATERIA_MIN + "kWh);<br/>");

        return Result.ok<CapacidadeBateria>(new CapacidadeBateria({ value: valor }));
    }

    public toString() {
        return String(this.props.value)
    }
}