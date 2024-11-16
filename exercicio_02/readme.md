#exercício 02
> 1. Tipagem dinâmica: O tipo de uma variável é determinado em tempo de execução. Exemplos: Python, JavaScript.
Tipagem estática: O tipo de uma variável é definido em tempo de compilação e não pode ser alterado. Exemplos: C, Java.

> 2. O principal problema é que os erros relacionados a tipos só são detectados em tempo de execução, o que pode causar falhas inesperadas no programa.

> 3. Um exemplo comum em JavaScript:
~~~ javascript
let x = "5";
let y = 10;
console.log(x + y); //Resultado: "510" (concatenação em vez de soma)
~~~

> 4. C possui tipagem fraca porque permite conversões implícitas entre tipos diferentes. Exemplo:
~~~ c
#includ <stdio.h>

int main() {
    int a = 10;
    double b = a;
    printf("b: %f\n", b);
    return 0;
}
~~~

Apesar de a ser um int, ele é convertido automaticamente para double.

> 5. Não. A aceitação de inteiros e ponto flutuante como parte do tipo number é uma característica de design, mas o TypeScript ainda é considerado de tipagem forte, já que não permite operações inválidas entre tipos incompatíveis sem um erro claro.

