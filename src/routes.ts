// Importa componentes do express
import {Router, json} from 'express';
// Importa UsuarioController
import UsuarioController from './controllers/UsuarioController';
// Importa FuncionarioController
import FuncionarioController from './controllers/FuncionarioController';
// Importa TipoController
import TipoController from './controllers/TipoController';
// Importa MaquinaController
import MaquinaController from './controllers/MaquinaController';
// Importa a middleware utilizada no controle de acesso
import ValidaToken from './middlewares/ValidaToken';

// Instancia roteador
const Roteador = Router();

Roteador.use(json());
Roteador.get('/funcionarios', ValidaToken, new FuncionarioController().index);
Roteador.get('/funcionarios/:id', ValidaToken, new FuncionarioController().show);
Roteador.post('/funcionarios', ValidaToken, new FuncionarioController().store);
Roteador.put('/funcionarios/:id', ValidaToken, new FuncionarioController().update);
Roteador.delete('/funcionarios/:id', ValidaToken, new FuncionarioController().delete);
Roteador.put('/funcionarios/maquinas/:id', ValidaToken, new FuncionarioController().associarMaquinas);

Roteador.get('/tipos', ValidaToken, new TipoController().index);
Roteador.get('/tipos/:id', ValidaToken, new TipoController().show);
Roteador.post('/tipos', ValidaToken, new TipoController().store);
Roteador.put('/tipos/:id', ValidaToken, new TipoController().update);
Roteador.delete('/tipos/:id', ValidaToken, new TipoController().delete);

Roteador.get('/maquinas', ValidaToken, new MaquinaController().index);
Roteador.get('/maquinas/:id', ValidaToken, new MaquinaController().show);
Roteador.post('/maquinas', ValidaToken, new MaquinaController().store);
Roteador.put('/maquinas/:id', ValidaToken, new MaquinaController().update);
Roteador.delete('/maquinas/:id', ValidaToken, new MaquinaController().delete);

Roteador.get('/usuarios/autenticacao', new UsuarioController().autenticacao);   // Autenticação - retorna um token de segurança se usuário for autenticado
Roteador.post('/usuarios', new UsuarioController().store);  // Cadastra usuário



export default Roteador;





