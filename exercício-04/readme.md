# exercício 04
> 1. (F) Objetos são modelos para classes; <br>
> (F) Atributos de uma classe devem ser obrigatoriamente inicializados para que as
classes compilem; <br>
> (F) Uma variável declarada dentro de um método deve ser inicializada para que a
classe seja compilável; <br>
> (V) Uma variável que seja uma classe declarada em um método é automaticamente
inicializada com undefined; <br>
> (V) Construtores são rotinas especiais que servem para inicializar e configurar os
objetos no momento da instanciação; <br>
> (f) Construtores não possuem tipo de retorno e podem ou não ter parâmetros; <br>
> (V) Uma classe pode ter várias instâncias. <br>

> 2. sim, pois apenas o tipo da variável foi definido, porém, nem um valor foi atribuído.

> 3. ~~~javascript
class Hotel {
    constructor(quantReserva: number) {
        this.quantReserva = quantReserva;
    }
}
~~~
