import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaTempoCargaExtraProps {
  tempoCargaExtra: string;
}

export class RotaTempoCargaExtra extends ValueObject<RotaTempoCargaExtraProps> {
  get tempoCargaExtra(): string {
    return this.props.tempoCargaExtra;
  }

  set tempoCargaExtra(value: string) {
    this.props.tempoCargaExtra = value;
  }

  private constructor(props: RotaTempoCargaExtraProps) {
    super(props);
  }

  public static create(text: string): Result<RotaTempoCargaExtra> {
    const regex = new RegExp(/^([0-5][0-9])$/);
      
    if(regex.test(text)) {
      return Result.ok<RotaTempoCargaExtra>(new RotaTempoCargaExtra({tempoCargaExtra: text}));
    }
    return Result.fail("O tempo de carga extra inserido não é valido!");
  }
}
