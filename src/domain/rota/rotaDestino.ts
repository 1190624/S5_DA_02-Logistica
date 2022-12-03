import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaDestinoProps {
  destino: string;
}

export class RotaDestino extends ValueObject<RotaDestinoProps> {
  get destino(): string {
    return this.props.destino;
  }

  set origem(value: string) {
    this.props.destino = value;
  }

  private constructor(props: RotaDestinoProps) {
    super(props);
  }

  public static create(text: string): Result<RotaDestino> {
    return Result.ok<RotaDestino>(
        new RotaDestino({destino: text}));
  }
}