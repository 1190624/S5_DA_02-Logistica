import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
/*
interface MatriculaProps {
    value: string;
  }
  */
  
  export class Matricula extends UniqueEntityID {
    /**
    get value (): string {
      return this.props.value;
    }
    
    set value(value : string){
      this.props.value = value;
    }
    public constructor (props: MatriculaProps) {
      super(props);
    }
  
    public static create (matricula: string): Result<Matricula> {
      return Result.ok<Matricula>(new Matricula({value: matricula}));


      
      /**
      const MATRICULA_REGEX = new RegExp(/[A-Z]{2}-[0-9]{2}-[A-Z]{2}/);
      
      if(MATRICULA_REGEX.test(matricula)) {
        return Result.ok<Matricula>(new Matricula({value: matricula}));
      }
      return Result.fail("A matrícula inserida não é valida!");*/
    }
    
      
      /*
      if (!new RegExp(MATRICULA_REGEX).test(matricula))
        //throw new BusinessRuleValidationException("Formato da Matrícula do Camião Elétrico inválido;<br/>Formato da Matrícula deve reger pelas regras estipuladas pelo IMT;<br/>");

        return Result.ok<Matricula>(new Matricula({ value: matricula })) 
        */
