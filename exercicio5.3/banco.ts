export class Conta {
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
  
export class Cliente {
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
  
export class Banco {
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

    consultarPorIndice(indice: number): Conta | undefined {
      if (indice >= 0 && indice < this.contas.length) {
          return this.contas[indice];
      } else {
          console.log("Erro: Índice inválido.");
          return undefined;
      }
  }

  excluirConta(idConta: number): void {
    const contaIndex = this.contas.findIndex((c) => c.idConta === idConta);

    if (contaIndex === -1) {
        console.log("Erro: Conta não encontrada.");
        return;
    }

    // Remover a conta do cliente que a possui
    this.clientes.forEach((cliente) => {
        cliente.contas = cliente.contas.filter((c) => c.idConta !== idConta);
    });

    this.contas.splice(contaIndex, 1);
    console.log("Conta excluída com sucesso.");
}


atualizarSaldo(idConta: number, novoSaldo: number): void {
  const conta = this.contas.find((c) => c.idConta === idConta);
  if (conta) {
      conta.saldo = novoSaldo;
      console.log("Saldo atualizado com sucesso.");
  } else {
      console.log("Erro: Conta não encontrada.");
  }
}

sacar(idConta: number, valor: number): void {
  const conta = this.contas.find((c) => c.idConta === idConta);
  if (conta) {
      if (conta.sacar(valor)) {
          console.log("Saque realizado com sucesso.");
      }
  } else {
      console.log("Erro: Conta não encontrada.");
  }
}

depositar(idConta: number, valor: number): void {
  const conta = this.contas.find((c) => c.idConta === idConta);
  if (conta) {
      conta.depositar(valor);
      console.log("Depósito realizado com sucesso.");
  } else {
      console.log("Erro: Conta não encontrada.");
  }
}

transferir(origemId: number, destinoId: number, valor: number): void {
  const contaOrigem = this.contas.find((c) => c.idConta === origemId);
  const contaDestino = this.contas.find((c) => c.idConta === destinoId);

  if (contaOrigem && contaDestino) {
      if (contaOrigem.sacar(valor)) {
          contaDestino.depositar(valor);
          console.log("Transferência realizada com sucesso.");
      }
  } else {
      console.log("Erro: Conta de origem ou destino não encontrada.");
  }
}

transferirParaVarias(origemId: number, destinos: number[], valor: number): void {
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
      } else {
          console.log(`Erro: Conta destino com ID ${destinoId} não encontrada.`);
      }
  });
}

quantidadeDeContas(): number {
  return this.contas.length;
}

totalDinheiro(): number {
  return this.contas.reduce((total, conta) => total + conta.saldo, 0);
}

mediaDosSaldos(): number {
  const total = this.totalDinheiro();
  const quantidade = this.quantidadeDeContas();
  return quantidade > 0 ? total / quantidade : 0;
}

mudarTitularidade(idConta: number, novoCpf: string): void {
  const conta = this.contas.find((c) => c.idConta === idConta);
  const novoCliente = this.clientes.find((c) => c.cpf === novoCpf);

  if (!conta) {
      console.log("Erro: Conta não encontrada.");
      return;
  }

  if (!novoCliente) {
      console.log("Erro: Novo cliente não encontrado.");
      return;
  }

  this.clientes.forEach((cliente) => {
      cliente.contas = cliente.contas.filter((c) => c.idConta !== idConta);
  });

  novoCliente.addConta(conta);
  console.log("Titularidade alterada com sucesso.");
}

excluirCliente(cpf: string): void {
  const clienteIndex = this.clientes.findIndex((c) => c.cpf === cpf);

  if (clienteIndex === -1) {
      console.log("Erro: Cliente não encontrado.");
      return;
  }

  const cliente = this.clientes[clienteIndex];

  // Mover as contas para a lista de contas sem titular
  cliente.contas.forEach((conta) => {
      this.contas.push(conta);
  });

  this.clientes.splice(clienteIndex, 1);
  console.log("Cliente excluído e suas contas foram movidas para contas sem titular.");
}


ordemBancaria(idOrigem: number, destinos: number[], valor: number): void {
  const contaOrigem = this.contas.find((c) => c.idConta === idOrigem);

  if (!contaOrigem) {
      console.log("Erro: Conta de origem não encontrada.");
      return;
  }

  const totalTransferencia = valor * destinos.length;

  if (contaOrigem.saldo < totalTransferencia) {
      console.log("Erro: Saldo insuficiente para realizar todas as transferências.");
      return;
  }

  destinos.forEach((idDestino) => {
      const contaDestino = this.contas.find((c) => c.idConta === idDestino);

      if (contaDestino) {
          contaOrigem.sacar(valor);
          contaDestino.depositar(valor);
      } else {
          console.log(`Erro: Conta destino com ID ${idDestino} não encontrada.`);
      }
  });

  console.log("Ordem bancária realizada com sucesso.");
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
  