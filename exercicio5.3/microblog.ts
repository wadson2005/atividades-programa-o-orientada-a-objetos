export class Postagem {
    id: number;
    texto: string;
    quantidadeCurtidas: number;

    constructor(id: number, texto: string) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = 0;
    }

    curtir(): void {
        this.quantidadeCurtidas++;
    }

    toString(): string {
        return `${this.texto} (Curtidas: ${this.quantidadeCurtidas})`;
    }
}

export class Microblog {
    postagens: Postagem[];

    constructor() {
        this.postagens = [];
    }

    adicionarPostagem(postagem: Postagem): void {
        this.postagens.push(postagem);
    }

    excluirPostagem(id: number): void {
        const index = this.postagens.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.postagens.splice(index, 1);
            console.log("Postagem excluída com sucesso.");
        } else {
            console.log("Erro: Postagem não encontrada.");
        }
    }

    postagemMaisCurtida(): Postagem | null {
        if (this.postagens.length === 0) return null;
        return this.postagens.reduce((maisCurtida, postagem) =>
            postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida
        );
    }

    curtirPostagem(id: number): void {
        const postagem = this.postagens.find((p) => p.id === id);
        if (postagem) postagem.curtir();
        else console.log("Erro: Postagem não encontrada.");
    }

    toString(): string {
        return this.postagens.map((p) => p.toString()).join("\n");
    }
}
