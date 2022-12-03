import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RotaTempoProps {
  tempo: string;
}

export class RotaTempo extends ValueObject<RotaTempoProps> {
  get tempo(): string {
    return this.props.tempo;
  }

  set tempo(value: string) {
    this.props.tempo = value;
  }

  private constructor(props: RotaTempoProps) {
    super(props);
  }

  public static create(text: string): Result<RotaTempo> {
    const regex = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
    if(regex.test(text)) {
      return Result.ok<RotaTempo>(new RotaTempo({tempo: text}));
    }
    return Result.fail("O tempo inserido não é valido!");
  }
}
