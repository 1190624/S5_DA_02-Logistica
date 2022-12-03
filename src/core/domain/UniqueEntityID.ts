
//import {uuid} from 'uuid/v4';
//const{ v4: uuidv4} = required('uuid');
import { Identifier } from './Identifier'
import {v4 as uuidv4} from 'uuid';
export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : uuidv4())
  }
}