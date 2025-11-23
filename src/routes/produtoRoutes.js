import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController.js';


const router = Router();
const controller = new ProdutoController();


// GET /produtos/ -> listar todos
router.get('/', (req, res) => controller.listarTodos(req, res));


// GET /produtos/:id -> buscar por id
router.get('/:id', (req, res) => controller.buscarPorId(req, res));


// POST /produtos -> criar
router.post('/', (req, res) => controller.criar(req, res));


// PUT /produtos/:id -> atualizar
router.put('/:id', (req, res) => controller.atualizar(req, res));


// DELETE /produtos/:id -> deletar
router.delete('/:id', (req, res) => controller.deletar(req, res));


export default router;