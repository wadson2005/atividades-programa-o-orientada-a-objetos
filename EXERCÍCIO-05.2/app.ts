import readlineSync from 'readline-sync';
import { Banco, Cliente, Conta } from './banco';
import { Microblog, Postagem } from './microblog';

const banco = new Banco();
const microblog = new Microblog();

function main() {
    let opcaoPrincipal: string;

    do {
        console.log("\n===== Menu Principal =====");
        console.log("1 - Acessar Banco");
        console.log("2 - Acessar Microblog");
        console.log("0 - Sair");

        opcaoPrincipal = readlineSync.question("Escolha uma opção: ");

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
    let opcaoBanco: string;

    do {
        console.log("\n===== Menu Banco =====");
        console.log("1 - Cadastrar Cliente");
        console.log("2 - Cadastrar Conta");
        console.log("3 - Transferência");
        console.log("4 - Listar Clientes");
        console.log("0 - Voltar ao Menu Principal");

        opcaoBanco = readlineSync.question("Escolha uma opção: ");

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
    let opcaoMicroblog: string;

    do {
        console.log("\n===== Menu Microblog =====");
        console.log("1 - Criar Postagem");
        console.log("2 - Curtir Postagem");
        console.log("3 - Excluir Postagem");
        console.log("4 - Listar Postagens");
        console.log("0 - Voltar ao Menu Principal");

        opcaoMicroblog = readlineSync.question("Escolha uma opção: ");

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
    const nome = readlineSync.question("Nome: ");
    const cpf = readlineSync.question("CPF: ");
    const dataNascimento = new Date(readlineSync.question("Data de Nascimento (AAAA-MM-DD): "));
    const cliente = new Cliente(banco.clientes.length + 1, nome, cpf, dataNascimento);
    banco.addCliente(cliente);
}

function cadastrarConta() {
    const idConta = parseInt(readlineSync.question("ID da Conta: "));
    const saldoInicial = parseFloat(readlineSync.question("Saldo Inicial: "));
    const conta = new Conta(idConta, saldoInicial);
    banco.inserirConta(conta);
}

function realizarTransferencia() {
    const origem = parseInt(readlineSync.question("ID Conta Origem: "));
    const destino = parseInt(readlineSync.question("ID Conta Destino: "));
    const valor = parseFloat(readlineSync.question("Valor: "));
    banco.transferir(origem, destino, valor);
}

function listarClientes() {
    banco.listarClientes();
}

function criarPostagem() {
    const texto = readlineSync.question("Texto da Postagem: ");
    const postagem = new Postagem(microblog.postagens.length + 1, texto);
    microblog.adicionarPostagem(postagem);
}

function curtirPostagem() {
    const id = parseInt(readlineSync.question("ID da Postagem: "));
    microblog.curtirPostagem(id);
}

function excluirPostagem() {
    const id = parseInt(readlineSync.question("ID da Postagem: "));
    microblog.excluirPostagem(id);
}

function listarPostagens() {
    console.log(microblog.toString());
}

main();
