import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaDistanciaProps {
  distancia: number;
}

export class RotaDistancia extends ValueObject<RotaDistanciaProps> {
  get distancia(): number {
    return this.props.distancia;
  }

  set distancia(value: number) {
    this.props.distancia = value;
  }

  private constructor(props: RotaDistanciaProps) {
    super(props);
  }

  public static create(num: number): Result<RotaDistancia> {
    const DISTANCIA_MINIMA = 0;
    
    if(num <= DISTANCIA_MINIMA) {
      return Result.fail("Distância mínima não pode ser menor que 0!");
    }
    return Result.ok<RotaDistancia>(new RotaDistancia({ distancia: num }));
    }
}
