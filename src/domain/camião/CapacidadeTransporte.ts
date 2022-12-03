import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface CapacidadeTransporteProps {
    value: number;
}

export class CapacidadeTransporte extends ValueObject<CapacidadeTransporteProps>{
    get value(): number {
        return this.props.value;
    }

    public constructor(props: CapacidadeTransporteProps) {
        super(props);
    }

    public static create(valor: number): Result<CapacidadeTransporte> {
        const CAPACIDADE_TRANSPORTE_MIN = 800;
        
        if (valor < CAPACIDADE_TRANSPORTE_MIN)
        return Result.fail("Capacidade de Transporte do Camião Elétrico é inferior ao minímo estipulado!");
            //throw new BusinessRuleValidationException("Capacidade de Transporte do Camião Elétrico é inferior ao minímo estipulado (" + CAPACIDADE_TRANSPORTE_MIN + "kg);<br/>");

        return Result.ok<CapacidadeTransporte>(new CapacidadeTransporte({ value: valor }));
    }

    public toString() {
        return String(this.props.value)
    }
}