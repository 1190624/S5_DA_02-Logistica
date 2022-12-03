import {expect} from "chai";
import { Camiao } from "../../../src/domain/camião/Camiao";
import { Autonomia } from "../../../src/domain/camião/Autonomia";
import { CapacidadeBateria } from "../../../src/domain/camião/CapacidadeBateria";
import { CapacidadeTransporte } from "../../../src/domain/camião/CapacidadeTransporte";
import { Caracteristica } from "../../../src/domain/camião/Caracteristica";
import { Matricula } from "../../../src/domain/camião/Matricula";
import { Tara } from "../../../src/domain/camião/Tara";
import { TempoCarregamento } from "../../../src/domain/camião/TempoCarregamento";


describe('Camião Testes Unitários', () => {
    
        let matricula = "BB-24-0A";
        let caracteristica = "Camiao2";
        let autonomia = 2313;
        let capacidadeTransporte= 2311;
        let capacidadeBateria = 2311;
        let tara=1001;
        let tempoCarregamento = "23:11";
    

	const autonomiaInvalida = 60;
	const capacidadeTransporteInvalida =100;
	const capacidadeBateriaInvalida = 40;
	const taraInvalida= 700;
	const caracteristicaVazia = " ";

const camião = Camiao.create({
	matricula: Matricula.create(matricula).getValue().value,
	caracteristica: Caracteristica.create(caracteristica).getValue().value,
	autonomia: Autonomia.create(autonomia).getValue().value,
	capacidadeTransporte: CapacidadeTransporte.create(capacidadeTransporte).getValue().value,
	capacidadeBateria: CapacidadeBateria.create(capacidadeBateria).getValue().value,
	tara: Tara.create(tara).getValue().value,
	tempoCarregamento: TempoCarregamento.create(tempoCarregamento).getValue().value

});


	it('Criar Tara Válida', () => {
		expect(camião.getValue().tara.value).to.equal(tara);
		//expect(camião.getValue().props.tara.value).to.equal(tara);
	})

	it('Criar Tara Inválida', () => {
		const invalida = Tara.create(taraInvalida);
		expect(true).to.equal(invalida.isFailure);
	})


	it('Criar autonomia Válida', () => {
		expect(camião.getValue().autonomia.value).to.equal(autonomia);
	})

	
	it('Criar autonomia Inválida', () => {
		const invalida = Autonomia.create(autonomiaInvalida);
		expect(true).to.equal(invalida.isFailure);
	})


	it('Criar Capacidade de Transporte Válida ', () => {
		expect(camião.getValue().capacidadeTransporte.value).to.equal(capacidadeTransporte);
	})

	
	it('Criar Capacidade de Transporte Inválida', () => {
		const invalida = CapacidadeTransporte.create(capacidadeTransporteInvalida);
		expect(true).to.equal(invalida.isFailure);
	})


	it('Criar Capacidade de Bateria Válida', () => {
		expect(camião.getValue().capacidadeBateria.value).to.equal(capacidadeBateria);
	})

	
	it('Criar Capacidade de Bateria Inválida', () => {
		const invalida = CapacidadeBateria.create(capacidadeBateriaInvalida);
		expect(true).to.equal(invalida.isFailure);
	})


    it('Criar Matrícula Válida', () => {
		expect(camião.getValue().matricula.value).to.equal(matricula);
	})


    it('Criar Caracteristica Válida', () => {
		expect(camião.getValue().caracteristica.value).to.equal(caracteristica);
	})

	it('Criar Caracteristica Vazia', () => {
		const invalida = Caracteristica.create(caracteristicaVazia);
		expect(true).to.equal(invalida.isFailure);
	})

    it('Criar Tempo de Carregamento Válido', () => {
		expect(camião.getValue().tempoCarregamento.value).to.equal(tempoCarregamento);
	})


})