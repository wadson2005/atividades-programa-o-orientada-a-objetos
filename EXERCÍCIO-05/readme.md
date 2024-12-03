###respostas exercício 5
> 6. Sim e não.
Sim, em projetos pequenos ou simples: Centralizar tudo em uma classe Banco pode ser mais prático.
Não, em projetos maiores: Ter múltiplas responsabilidades (cadastrar, validar, associar, consultar) em uma única classe viola o princípio de responsabilidade única. Isso dificulta a manutenção e o crescimento do sistema.
> b. sim, seria mais adequado, pois permite centralizar o código a cada tipo de intidade, evita duplicação de código, como também facilita a leitura e a manutenção do código.

> c. O método associarContaCliente deve ficar no Banco ou em uma classe especializada como um "Gerenciador". Isso evita acoplamento excessivo nas classes de cadastro.
