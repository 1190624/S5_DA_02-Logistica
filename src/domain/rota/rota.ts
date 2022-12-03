import { Aggregate } from 'mongoose';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import IRotaDTO from '../../dto/IRotaDTO';
import { RotaDestino } from './rotaDestino';
import { RotaDistancia } from './rotaDistancia';
import { RotaGastoEnergetico } from './rotaGastoEnergetico';
import { RotaTempoCargaExtra } from './rotaTempoCargaExtra';
import { RotaId } from './rotaId';
import { RotaOrigem } from './rotaOrigem';
import { RotaTempo } from './rotaTempo';

interface RotaProps {
    rotaId: RotaId;
    rotaOrigem: RotaOrigem;
    rotaDestino: RotaDestino;
    rotaDistancia: RotaDistancia;
    rotaTempo: RotaTempo;
    rotaGastoEnergetico: RotaGastoEnergetico;
    rotaTempoCargaExtra: RotaTempoCargaExtra;
}

export class Rota extends AggregateRoot<RotaProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get rotaId(): RotaId {
        return this.props.rotaId;
    }

    get rotaOrigem(): RotaOrigem {
        return this.props.rotaOrigem;
    }

    get rotaDestino(): RotaDestino {
        return this.props.rotaDestino;
    }

    get rotaDistancia(): RotaDistancia {
        return this.props.rotaDistancia;
    }

    get rotaTempo(): RotaTempo {
        return this.props.rotaTempo;
    }

    get rotaGastoEnergetico(): RotaGastoEnergetico {
        return this.props.rotaGastoEnergetico;
    }

    get rotaTempoCargaExtra(): RotaTempoCargaExtra {
        return this.props.rotaTempoCargaExtra;
    }

    private constructor(props: RotaProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(rotaDTO: IRotaDTO | any, id?: UniqueEntityID): Result<Rota> {
        
        const rotaId = new RotaId(rotaDTO.rotaId);
        const rotaOrigem = RotaOrigem.create(rotaDTO.origem);
        const rotaDestino = RotaDestino.create(rotaDTO.destino);
        const rotaDistancia = RotaDistancia.create(rotaDTO.distancia);
        const rotaTempo = RotaTempo.create(rotaDTO.tempo);
        const rotaGastoEnergetico = RotaGastoEnergetico.create(rotaDTO.gastoEnergetico);
        const rotaTempoCargaExtra = RotaTempoCargaExtra.create(rotaDTO.tempoCargaExtra);

        if (rotaDestino === undefined || rotaDestino === undefined) {
            return Result.fail<Rota>('Rota Id, Origem e Destino são obirgatórios.');
        } else {
            const rota = new Rota(
            {
                rotaId: rotaId,
                rotaOrigem: rotaOrigem.getValue(),
                rotaDestino: rotaDestino.getValue(),
                rotaDistancia: rotaDistancia.getValue(),
                rotaTempo: rotaTempo.getValue(),
                rotaGastoEnergetico: rotaGastoEnergetico.getValue(),
                rotaTempoCargaExtra: rotaTempoCargaExtra.getValue(),
            },id);
            return Result.ok<Rota>(rota);
        }
    }
}