import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface AutonomiaProps {
    value: number;
}

export class Autonomia extends ValueObject<AutonomiaProps>{
    get value(): number {
        return this.props.value;
    }

    public constructor(props: AutonomiaProps) {
        super(props);
    }

    public static create(valor: number): Result<Autonomia> {
        const AUTONOMIA_MIN = 90;

        if (valor < AUTONOMIA_MIN)
        return Result.fail("Automia do Camião Elétrico é inferior ao minímo estipulado.");
            //throw new BusinessRuleValidationException("Automia do Camião Elétrico é inferior ao minímo estipulado (" + AUTONOMIA_MIN + "km);<br/>");

        return Result.ok<Autonomia>(new Autonomia({ value: valor}));
    }

    public toString() {
        return String(this.props.value)
    }
}