"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const banco_1 = require("./banco");
const microblog_1 = require("./microblog");
class App {
    constructor() {
        this.banco = new banco_1.Banco();
        this.microblog = new microblog_1.Microblog();
    }
    mainMenu() {
        let opcao;
        do {
            console.log("\n===== Menu Principal =====");
            console.log("1 - Banco");
            console.log("2 - Microblog");
            console.log("0 - Sair");
            opcao = readline_sync_1.default.question("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.bancoMenu();
                    break;
                case "2":
                    this.microblogMenu();
                    break;
                case "0":
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } while (opcao !== "0");
    }
    bancoMenu() {
        let opcao;
        do {
            console.log("\n===== Menu Banco =====");
            console.log("1 - Cadastrar Cliente");
            console.log("2 - Cadastrar Conta");
            console.log("3 - Transferência");
            console.log("4 - Listar Clientes");
            console.log("5 - Listar Contas sem Cliente e Atribuir Titularidade");
            console.log("6 - Mudar Titularidade de uma Conta");
            console.log("7 - Excluir Cliente");
            console.log("8 - Excluir Conta");
            console.log("9 - Efetuar Ordem Bancária");
            console.log("0 - Voltar");
            opcao = readline_sync_1.default.question("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.cadastrarCliente();
                    break;
                case "2":
                    this.cadastrarConta();
                    break;
                case "3":
                    this.realizarTransferencia();
                    break;
                case "4":
                    this.listarClientes();
                    break;
                case "5":
                    //this.listarContasSemCliente();
                    console.log("função incompleta. ");
                    break;
                case "6":
                    this.mudarTitularidade();
                    break;
                case "7":
                    this.excluirCliente();
                    break;
                case "8":
                    this.excluirConta();
                    break;
                case "9":
                    this.efetuarOrdemBancaria();
                    break;
                case "0":
                    console.log("Retornando ao Menu Principal...");
                    break;
                default:
                    console.log("Opção inválida, tente novamente.");
            }
        } while (opcao !== "0");
    }
    microblogMenu() {
        let opcao;
        do {
            console.log("\n===== Menu Microblog =====");
            console.log("1 - Criar Postagem");
            console.log("2 - Curtir Postagem");
            console.log("3 - Excluir Postagem");
            console.log("4 - Listar Postagens");
            console.log("0 - Voltar");
            opcao = readline_sync_1.default.question("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.criarPostagem();
                    break;
                case "2":
                    this.curtirPostagem();
                    break;
                case "3":
                    this.excluirPostagem();
                    break;
                case "4":
                    this.listarPostagens();
                    break;
                case "0":
                    console.log("Retornando ao Menu Principal...");
                    break;
                default:
                    console.log("Opção inválida, tente novamente.");
            }
        } while (opcao !== "0");
    }
    cadastrarCliente() {
        const nome = readline_sync_1.default.question("Nome: ");
        const cpf = readline_sync_1.default.question("CPF: ");
        const dataNascimento = new Date(readline_sync_1.default.question("Data de Nascimento (AAAA-MM-DD): "));
        const cliente = new banco_1.Cliente(this.banco.clientes.length + 1, nome, cpf, dataNascimento);
        this.banco.addCliente(cliente);
    }
    cadastrarConta() {
        const idConta = parseInt(readline_sync_1.default.question("ID da Conta: "));
        const saldoInicial = parseFloat(readline_sync_1.default.question("Saldo Inicial: "));
        const conta = new banco_1.Conta(idConta, saldoInicial);
        this.banco.inserirConta(conta);
    }
    realizarTransferencia() {
        const origem = parseInt(readline_sync_1.default.question("ID Conta Origem: "));
        const destino = parseInt(readline_sync_1.default.question("ID Conta Destino: "));
        const valor = parseFloat(readline_sync_1.default.question("Valor: "));
        this.banco.transferir(origem, destino, valor);
    }
    listarClientes() {
        this.banco.listarClientes();
    }
    mudarTitularidade() {
        const idConta = parseInt(readline_sync_1.default.question("ID da Conta: "));
        const novoCpf = readline_sync_1.default.question("CPF do Novo Titular: ");
        this.banco.mudarTitularidade(idConta, novoCpf);
    }
    excluirCliente() {
        const cpf = readline_sync_1.default.question("CPF do Cliente a ser excluído: ");
        this.banco.excluirCliente(cpf);
    }
    excluirConta() {
        const idConta = parseInt(readline_sync_1.default.question("ID da Conta a ser excluída: "));
        this.banco.excluirConta(idConta);
    }
    efetuarOrdemBancaria() {
        const idOrigem = parseInt(readline_sync_1.default.question("ID da Conta Origem: "));
        const numDestinos = parseInt(readline_sync_1.default.question("Número de Contas Destino: "));
        const destinos = [];
        for (let i = 0; i < numDestinos; i++) {
            const idDestino = parseInt(readline_sync_1.default.question(`ID da Conta Destino ${i + 1}: `));
            destinos.push(idDestino);
        }
        const valor = parseFloat(readline_sync_1.default.question("Valor por Transferência: "));
        this.banco.ordemBancaria(idOrigem, destinos, valor);
    }
    criarPostagem() {
        const texto = readline_sync_1.default.question("Texto da Postagem: ");
        const postagem = new microblog_1.Postagem(this.microblog.postagens.length + 1, texto);
        this.microblog.adicionarPostagem(postagem);
    }
    curtirPostagem() {
        const id = parseInt(readline_sync_1.default.question("ID da Postagem: "));
        this.microblog.curtirPostagem(id);
    }
    excluirPostagem() {
        const id = parseInt(readline_sync_1.default.question("ID da Postagem: "));
        this.microblog.excluirPostagem(id);
    }
    listarPostagens() {
        console.log(this.microblog.toString());
    }
}
const app = new App();
app.mainMenu();
