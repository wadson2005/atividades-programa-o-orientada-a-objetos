"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const banco_1 = require("./banco");
const microblog_1 = require("./microblog");
const banco = new banco_1.Banco();
const microblog = new microblog_1.Microblog();
function main() {
    let opcaoPrincipal;
    do {
        console.log("\n===== Menu Principal =====");
        console.log("1 - Acessar Banco");
        console.log("2 - Acessar Microblog");
        console.log("0 - Sair");
        opcaoPrincipal = readline_sync_1.default.question("Escolha uma opção: ");
        switch (opcaoPrincipal) {
            case "1":
                menuBanco();
                break;
            case "2":
                menuMicroblog();
                break;
            case "0":
                console.log("Encerrando aplicação...");
                break;
            default:
                console.log("Opção inválida, tente novamente.");
        }
    } while (opcaoPrincipal !== "0");
}
function menuBanco() {
    let opcaoBanco;
    do {
        console.log("\n===== Menu Banco =====");
        console.log("1 - Cadastrar Cliente");
        console.log("2 - Cadastrar Conta");
        console.log("3 - Transferência");
        console.log("4 - Listar Clientes");
        console.log("0 - Voltar ao Menu Principal");
        opcaoBanco = readline_sync_1.default.question("Escolha uma opção: ");
        switch (opcaoBanco) {
            case "1":
                cadastrarCliente();
                break;
            case "2":
                cadastrarConta();
                break;
            case "3":
                realizarTransferencia();
                break;
            case "4":
                listarClientes();
                break;
            case "0":
                console.log("Retornando ao Menu Principal...");
                break;
            default:
                console.log("Opção inválida, tente novamente.");
        }
    } while (opcaoBanco !== "0");
}
function menuMicroblog() {
    let opcaoMicroblog;
    do {
        console.log("\n===== Menu Microblog =====");
        console.log("1 - Criar Postagem");
        console.log("2 - Curtir Postagem");
        console.log("3 - Excluir Postagem");
        console.log("4 - Listar Postagens");
        console.log("0 - Voltar ao Menu Principal");
        opcaoMicroblog = readline_sync_1.default.question("Escolha uma opção: ");
        switch (opcaoMicroblog) {
            case "1":
                criarPostagem();
                break;
            case "2":
                curtirPostagem();
                break;
            case "3":
                excluirPostagem();
                break;
            case "4":
                listarPostagens();
                break;
            case "0":
                console.log("Retornando ao Menu Principal...");
                break;
            default:
                console.log("Opção inválida, tente novamente.");
        }
    } while (opcaoMicroblog !== "0");
}
function cadastrarCliente() {
    const nome = readline_sync_1.default.question("Nome: ");
    const cpf = readline_sync_1.default.question("CPF: ");
    const dataNascimento = new Date(readline_sync_1.default.question("Data de Nascimento (AAAA-MM-DD): "));
    const cliente = new banco_1.Cliente(banco.clientes.length + 1, nome, cpf, dataNascimento);
    banco.addCliente(cliente);
}
function cadastrarConta() {
    const idConta = parseInt(readline_sync_1.default.question("ID da Conta: "));
    const saldoInicial = parseFloat(readline_sync_1.default.question("Saldo Inicial: "));
    const conta = new banco_1.Conta(idConta, saldoInicial);
    banco.inserirConta(conta);
}
function realizarTransferencia() {
    const origem = parseInt(readline_sync_1.default.question("ID Conta Origem: "));
    const destino = parseInt(readline_sync_1.default.question("ID Conta Destino: "));
    const valor = parseFloat(readline_sync_1.default.question("Valor: "));
    banco.transferir(origem, destino, valor);
}
function listarClientes() {
    banco.listarClientes();
}
function criarPostagem() {
    const texto = readline_sync_1.default.question("Texto da Postagem: ");
    const postagem = new microblog_1.Postagem(microblog.postagens.length + 1, texto);
    microblog.adicionarPostagem(postagem);
}
function curtirPostagem() {
    const id = parseInt(readline_sync_1.default.question("ID da Postagem: "));
    microblog.curtirPostagem(id);
}
function excluirPostagem() {
    const id = parseInt(readline_sync_1.default.question("ID da Postagem: "));
    microblog.excluirPostagem(id);
}
function listarPostagens() {
    console.log(microblog.toString());
}
main();
