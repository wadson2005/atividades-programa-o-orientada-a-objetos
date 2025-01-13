class Calculadora {
    private operando1: number;
    private operando2: number;

    constructor(operando1: number, operando2: number) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    soma(): number {
        return this.operando1 + this.operando2;
    }

    // Adicionado para permitir acesso aos atributos nas classes filhas
    getOperando1(): number {
        return this.operando1;
    }

    getOperando2(): number {
        return this.operando2;
    }
}

class CalculadoraCientifica extends Calculadora {
    exponenciar(): number {
        return Math.pow(this.getOperando1(), this.getOperando2());
    }
}

// Teste da classe CalculadoraCientifica
const calculadoraCientifica = new CalculadoraCientifica(2, 3);
console.log(`A soma é: ${calculadoraCientifica.soma()}`); // A soma é: 5
console.log(`A exponenciação é: ${calculadoraCientifica.exponenciar()}`); // A exponenciação é: 8
