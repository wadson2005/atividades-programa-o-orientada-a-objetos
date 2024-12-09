"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.Cliente = exports.Conta = void 0;
class Conta {
    constructor(idConta, saldoInicial = 0) {
        this.idConta = idConta;
        this.saldo = saldoInicial;
    }
    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
        }
        else {
            console.log("Erro: O valor informado deve ser positivo.");
        }
    }
    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        else {
            console.log("Erro: Saldo insuficiente ou valor inválido.");
            return false;
        }
    }
    verificarSaldo() {
        return this.saldo;
    }
}
exports.Conta = Conta;
class Cliente {
    constructor(id, nome, cpf, dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = []; // Inicializa o array de contas
    }
    addConta(conta) {
        const contaJaExistente = this.contas.some((c) => c.idConta === conta.idConta);
        if (contaJaExistente) {
            console.log("Erro: Conta já associada a este cliente.");
            return;
        }
        this.contas.push(conta);
    }
    listarContas() {
        console.log(`Contas de ${this.nome}:`);
        this.contas.forEach((conta, index) => {
            console.log(`Conta ${index + 1}: ID ${conta.idConta}, Saldo: R$${conta.verificarSaldo()}`);
        });
    }
}
exports.Cliente = Cliente;
class Banco {
    constructor() {
        this.clientes = [];
        this.contas = [];
    }
    addCliente(cliente) {
        const clienteExistente = this.clientes.some((c) => c.id === cliente.id || c.cpf === cliente.cpf);
        if (clienteExistente) {
            console.log("Erro: Cliente com mesmo ID ou CPF já existe.");
            return;
        }
        this.clientes.push(cliente);
    }
    inserirConta(conta) {
        const contaExistente = this.contas.some((c) => c.idConta === conta.idConta);
        if (contaExistente) {
            console.log("Erro: Uma conta com esse ID já existe.");
            return;
        }
        this.contas.push(conta);
    }
    associarContaCliente(numeroConta, cpfCliente) {
        const cliente = this.clientes.find((c) => c.cpf === cpfCliente);
        const conta = this.contas.find((c) => c.idConta === numeroConta);
        if (!cliente) {
            console.log("Erro: Cliente não encontrado.");
            return;
        }
        if (!conta) {
            console.log("Erro: Conta não encontrada.");
            return;
        }
        const contaJaAssociada = cliente.contas.some((c) => c.idConta === conta.idConta);
        if (contaJaAssociada) {
            console.log("Erro: Conta já associada ao cliente.");
            return;
        }
        cliente.addConta(conta);
    }
    listarContasCliente(cpf) {
        const cliente = this.clientes.find((c) => c.cpf === cpf);
        if (!cliente) {
            console.log("Erro: Cliente não encontrado.");
            return [];
        }
        return cliente.contas;
    }
    totalizarSaldoCliente(cpf) {
        const cliente = this.clientes.find((c) => c.cpf === cpf);
        if (!cliente) {
            console.log("Erro: Cliente não encontrado.");
            return 0;
        }
        return cliente.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
    buscarPorCpf(cpf) {
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }
    listarClientes() {
        console.log(`Lista de clientes:`);
        this.clientes.forEach((cliente) => {
            console.log(`ID: ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
        });
    }
    consultarPorIndice(indice) {
        if (indice >= 0 && indice < this.contas.length) {
            return this.contas[indice];
        }
        else {
            console.log("Erro: Índice inválido.");
            return undefined;
        }
    }
    excluirConta(idConta) {
        const index = this.contas.findIndex((c) => c.idConta === idConta);
        if (index >= 0) {
            this.contas.splice(index, 1);
            console.log("Conta excluída com sucesso.");
        }
        else {
            console.log("Erro: Conta não encontrada.");
        }
    }
    atualizarSaldo(idConta, novoSaldo) {
        const conta = this.contas.find((c) => c.idConta === idConta);
        if (conta) {
            conta.saldo = novoSaldo;
            console.log("Saldo atualizado com sucesso.");
        }
        else {
            console.log("Erro: Conta não encontrada.");
        }
    }
    sacar(idConta, valor) {
        const conta = this.contas.find((c) => c.idConta === idConta);
        if (conta) {
            if (conta.sacar(valor)) {
                console.log("Saque realizado com sucesso.");
            }
        }
        else {
            console.log("Erro: Conta não encontrada.");
        }
    }
    depositar(idConta, valor) {
        const conta = this.contas.find((c) => c.idConta === idConta);
        if (conta) {
            conta.depositar(valor);
            console.log("Depósito realizado com sucesso.");
        }
        else {
            console.log("Erro: Conta não encontrada.");
        }
    }
    transferir(origemId, destinoId, valor) {
        const contaOrigem = this.contas.find((c) => c.idConta === origemId);
        const contaDestino = this.contas.find((c) => c.idConta === destinoId);
        if (contaOrigem && contaDestino) {
            if (contaOrigem.sacar(valor)) {
                contaDestino.depositar(valor);
                console.log("Transferência realizada com sucesso.");
            }
        }
        else {
            console.log("Erro: Conta de origem ou destino não encontrada.");
        }
    }
    transferirParaVarias(origemId, destinos, valor) {
        const contaOrigem = this.contas.find((c) => c.idConta === origemId);
        if (!contaOrigem) {
            console.log("Erro: Conta de origem não encontrada.");
            return;
        }
        destinos.forEach((destinoId) => {
            const contaDestino = this.contas.find((c) => c.idConta === destinoId);
            if (contaDestino) {
                if (contaOrigem.sacar(valor)) {
                    contaDestino.depositar(valor);
                }
            }
            else {
                console.log(`Erro: Conta destino com ID ${destinoId} não encontrada.`);
            }
        });
    }
    quantidadeDeContas() {
        return this.contas.length;
    }
    totalDinheiro() {
        return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
    mediaDosSaldos() {
        const total = this.totalDinheiro();
        const quantidade = this.quantidadeDeContas();
        return quantidade > 0 ? total / quantidade : 0;
    }
}
exports.Banco = Banco;
// Testando o código
const banco = new Banco();
const cliente1 = new Cliente(1, "Wadson", "123.456.789-00", new Date("2005-12-01"));
banco.addCliente(cliente1);
const conta1 = new Conta(101, 1000);
banco.inserirConta(conta1);
banco.associarContaCliente(101, "123.456.789-00");
cliente1.listarContas();
conta1.depositar(500);
conta1.sacar(300);
console.log(`Saldo final: R$ ${conta1.verificarSaldo()}`);
banco.listarClientes();
