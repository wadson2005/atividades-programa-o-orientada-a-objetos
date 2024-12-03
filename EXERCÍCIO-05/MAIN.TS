class Conta {
    idConta: number;
    saldo: number;
  
    constructor(idConta: number, saldoInicial: number = 0) {
      this.idConta = idConta;
      this.saldo = saldoInicial;
    }
  
    depositar(valor: number): void {
      if (valor > 0) {
        this.saldo += valor;
      } else {
        console.log("Erro: O valor informado deve ser positivo.");
      }
    }
  
    sacar(valor: number): boolean {
      if (valor > 0 && valor <= this.saldo) {
        this.saldo -= valor;
        return true;
      } else {
        console.log("Erro: Saldo insuficiente ou valor inválido.");
        return false;
      }
    }
  
    verificarSaldo(): number {
      return this.saldo;
    }
  }
  
  class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[];
  
    constructor(id: number, nome: string, cpf: string, dataNascimento: Date) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.dataNascimento = dataNascimento;
      this.contas = []; // Inicializa o array de contas
    }
  
    addConta(conta: Conta): void {
      const contaJaExistente = this.contas.some((c) => c.idConta === conta.idConta);
      if (contaJaExistente) {
        console.log("Erro: Conta já associada a este cliente.");
        return;
      }
      this.contas.push(conta);
    }
  
    listarContas(): void {
      console.log(`Contas de ${this.nome}:`);
      this.contas.forEach((conta, index) => {
        console.log(`Conta ${index + 1}: ID ${conta.idConta}, Saldo: R$${conta.verificarSaldo()}`);
      });
    }
  }
  
  class Banco {
    clientes: Cliente[];
    contas: Conta[];
  
    constructor() {
      this.clientes = [];
      this.contas = [];
    }
  
    addCliente(cliente: Cliente): void {
      const clienteExistente = this.clientes.some(
        (c) => c.id === cliente.id || c.cpf === cliente.cpf
      );
      if (clienteExistente) {
        console.log("Erro: Cliente com mesmo ID ou CPF já existe.");
        return;
      }
      this.clientes.push(cliente);
    }
  
    inserirConta(conta: Conta): void {
      const contaExistente = this.contas.some((c) => c.idConta === conta.idConta);
      if (contaExistente) {
        console.log("Erro: Uma conta com esse ID já existe.");
        return;
      }
      this.contas.push(conta);
    }
  
    associarContaCliente(numeroConta: number, cpfCliente: string): void {
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
  
    listarContasCliente(cpf: string): Conta[] {
      const cliente = this.clientes.find((c) => c.cpf === cpf);
      if (!cliente) {
        console.log("Erro: Cliente não encontrado.");
        return [];
      }
      return cliente.contas;
    }
  
    totalizarSaldoCliente(cpf: string): number {
      const cliente = this.clientes.find((c) => c.cpf === cpf);
      if (!cliente) {
        console.log("Erro: Cliente não encontrado.");
        return 0;
      }
  
      return cliente.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
  
    buscarPorCpf(cpf: string): Cliente | undefined {
      return this.clientes.find((cliente) => cliente.cpf === cpf);
    }
  
    listarClientes(): void {
      console.log(`Lista de clientes:`);
      this.clientes.forEach((cliente) => {
        console.log(`ID: ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
      });
    }
  }
  
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
  