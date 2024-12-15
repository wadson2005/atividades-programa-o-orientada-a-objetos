"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microblog = exports.Postagem = void 0;
class Postagem {
    constructor(id, texto) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = 0;
    }
    curtir() {
        this.quantidadeCurtidas++;
    }
    toString() {
        return `${this.texto} (Curtidas: ${this.quantidadeCurtidas})`;
    }
}
exports.Postagem = Postagem;
class Microblog {
    constructor() {
        this.postagens = [];
    }
    adicionarPostagem(postagem) {
        this.postagens.push(postagem);
    }
    excluirPostagem(id) {
        const index = this.postagens.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.postagens.splice(index, 1);
            console.log("Postagem excluída com sucesso.");
        }
        else {
            console.log("Erro: Postagem não encontrada.");
        }
    }
    postagemMaisCurtida() {
        if (this.postagens.length === 0)
            return null;
        return this.postagens.reduce((maisCurtida, postagem) => postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida);
    }
    curtirPostagem(id) {
        const postagem = this.postagens.find((p) => p.id === id);
        if (postagem)
            postagem.curtir();
        else
            console.log("Erro: Postagem não encontrada.");
    }
    toString() {
        return this.postagens.map((p) => p.toString()).join("\n");
    }
}
exports.Microblog = Microblog;
