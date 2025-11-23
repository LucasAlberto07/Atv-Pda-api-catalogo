import Produto from '../models/Produto.js';

export default class ProdutoController {
  constructor() {
    // "Banco de dados" em memória
    this.produtos = [];
    this.proximoId = 1;
  }

  // Listar todos
  listarTodos(req, res) {
    return res.json(this.produtos);
  }

  // Buscar por ID
  buscarPorId(req, res) {
    const id = Number(req.params.id);
    const produto = this.produtos.find(p => p.id === id);

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    return res.json(produto);
  }

  // Criar
  criar(req, res) {
    const { nome, categoria, preco } = req.body;

    // validações simples
    if (!nome || !categoria || preco === undefined) {
      return res.status(400).json({ mensagem: 'nome, categoria e preco são obrigatórios' });
    }

    const novo = new Produto(this.proximoId++, nome, categoria, preco);
    this.produtos.push(novo);

    return res.status(201).json(novo);
  }

  // Atualizar
  atualizar(req, res) {
    const id = Number(req.params.id);
    const produtoIndex = this.produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const { nome, categoria, preco } = req.body;

    const produtoExistente = this.produtos[produtoIndex];

    produtoExistente.nome = nome !== undefined ? nome : produtoExistente.nome;
    produtoExistente.categoria = categoria !== undefined ? categoria : produtoExistente.categoria;
    produtoExistente.preco = preco !== undefined ? preco : produtoExistente.preco;

    this.produtos[produtoIndex] = produtoExistente;

    
    return res.json(produtoExistente);
  }

  // Deletar
  deletar(req, res) {
    const id = Number(req.params.id);
    const produtoIndex = this.produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const removido = this.produtos.splice(produtoIndex, 1)[0];

    return res.json({
      mensagem: 'Produto removido com sucesso',
      produto: removido
    });
  }
}
