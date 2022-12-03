import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface CaracteristicaProps {
    value: string;
}

export class Caracteristica extends ValueObject<CaracteristicaProps>{
    get value(): string {
        return this.props.value;
    }

    public constructor(props: CaracteristicaProps) {
        super(props);
    }

    public static create(texto: string): Result<Caracteristica> {
        if (texto == " ")
        return Result.fail("Necessário inserir uma Característica do Camião Elétrico!");
            //throw new BusinessRuleValidationException("Necessário inserir uma Característica do Camião Elétrico;<br/>");
            
        return Result.ok<Caracteristica>(new Caracteristica({ value: texto }));
    }

    public toString() {
        return String(this.props.value)
    }
}