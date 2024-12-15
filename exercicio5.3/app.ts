import readlineSync from 'readline-sync';
import { Banco, Cliente, Conta } from './banco';
import { Microblog, Postagem } from './microblog';

class App {
    banco: Banco;
    microblog: Microblog;

    constructor() {
        this.banco = new Banco();
        this.microblog = new Microblog();
    }

    mainMenu(): void {
        let opcao: string;

        do {
            console.log("\n===== Menu Principal =====");
            console.log("1 - Banco");
            console.log("2 - Microblog");
            console.log("0 - Sair");

            opcao = readlineSync.question("Escolha uma opção: ");

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

    bancoMenu(): void {
        let opcao: string;

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

            opcao = readlineSync.question("Escolha uma opção: ");

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

    microblogMenu(): void {
        let opcao: string;

        do {
            console.log("\n===== Menu Microblog =====");
            console.log("1 - Criar Postagem");
            console.log("2 - Curtir Postagem");
            console.log("3 - Excluir Postagem");
            console.log("4 - Listar Postagens");
            console.log("0 - Voltar");

            opcao = readlineSync.question("Escolha uma opção: ");

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

    cadastrarCliente(): void {
        const nome = readlineSync.question("Nome: ");
        const cpf = readlineSync.question("CPF: ");
        const dataNascimento = new Date(readlineSync.question("Data de Nascimento (AAAA-MM-DD): "));
        const cliente = new Cliente(this.banco.clientes.length + 1, nome, cpf, dataNascimento);
        this.banco.addCliente(cliente);
    }

    cadastrarConta(): void {
        const idConta = parseInt(readlineSync.question("ID da Conta: "));
        const saldoInicial = parseFloat(readlineSync.question("Saldo Inicial: "));
        const conta = new Conta(idConta, saldoInicial);
        this.banco.inserirConta(conta);
    }

    realizarTransferencia(): void {
        const origem = parseInt(readlineSync.question("ID Conta Origem: "));
        const destino = parseInt(readlineSync.question("ID Conta Destino: "));
        const valor = parseFloat(readlineSync.question("Valor: "));
        this.banco.transferir(origem, destino, valor);
    }

    listarClientes(): void {
        this.banco.listarClientes();
    }

    mudarTitularidade(): void {
        const idConta = parseInt(readlineSync.question("ID da Conta: "));
        const novoCpf = readlineSync.question("CPF do Novo Titular: ");
        this.banco.mudarTitularidade(idConta, novoCpf);
    }

    excluirCliente(): void {
        const cpf = readlineSync.question("CPF do Cliente a ser excluído: ");
        this.banco.excluirCliente(cpf);
    }

    excluirConta(): void {
        const idConta = parseInt(readlineSync.question("ID da Conta a ser excluída: "));
        this.banco.excluirConta(idConta);
    }

    efetuarOrdemBancaria(): void {
        const idOrigem = parseInt(readlineSync.question("ID da Conta Origem: "));
        const numDestinos = parseInt(readlineSync.question("Número de Contas Destino: "));
        const destinos: number[] = [];

        for (let i = 0; i < numDestinos; i++) {
            const idDestino = parseInt(readlineSync.question(`ID da Conta Destino ${i + 1}: `));
            destinos.push(idDestino);
        }

        const valor = parseFloat(readlineSync.question("Valor por Transferência: "));
        this.banco.ordemBancaria(idOrigem, destinos, valor);
    }

    criarPostagem(): void {
        const texto = readlineSync.question("Texto da Postagem: ");
        const postagem = new Postagem(this.microblog.postagens.length + 1, texto);
        this.microblog.adicionarPostagem(postagem);
    }

    curtirPostagem(): void {
        const id = parseInt(readlineSync.question("ID da Postagem: "));
        this.microblog.curtirPostagem(id);
    }

    excluirPostagem(): void {
        const id = parseInt(readlineSync.question("ID da Postagem: "));
        this.microblog.excluirPostagem(id);
    }

    listarPostagens(): void {
        console.log(this.microblog.toString());
    }
}

const app = new App();
app.mainMenu();
