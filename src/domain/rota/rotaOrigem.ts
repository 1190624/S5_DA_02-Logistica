import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaOrigemProps {
  origem: string;
}

export class RotaOrigem extends ValueObject<RotaOrigemProps> {
  get origem(): string {
    return this.props.origem;
  }

  set origem(value: string) {
    this.props.origem = value;
  }

  private constructor(props: RotaOrigemProps) {
    super(props);
  }

  public static create(text: string): Result<RotaOrigem> {
    return Result.ok<RotaOrigem>(new RotaOrigem({origem: text}));
  }
}