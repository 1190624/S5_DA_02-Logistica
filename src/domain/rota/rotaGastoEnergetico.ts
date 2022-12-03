import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaGastoEnergeticoProps {
  gastoEnergetico: number;
}

export class RotaGastoEnergetico extends ValueObject<RotaGastoEnergeticoProps> {
  get gastoEnergetico(): number {
    return this.props.gastoEnergetico;
  }

  set gastoEnergetico(value: number) {
    this.props.gastoEnergetico = value;
  }

  private constructor(props: RotaGastoEnergeticoProps) {
    super(props);
  }

  public static create(num: number): Result<RotaGastoEnergetico> { 
  const GASTO_MINIMO = 0;

  if(num <= GASTO_MINIMO) {
    return Result.fail("Gasto Energético não pode ser menor que 0!");
  }
  return Result.ok<RotaGastoEnergetico>(new RotaGastoEnergetico({ gastoEnergetico: num }));
  }
}
