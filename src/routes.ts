// Importa componentes do express
import {Router, json} from 'express';
// Importa FuncionarioController
import FuncionarioController from './controllers/FuncionarioController';
// Importa TipoController
import TipoController from './controllers/TipoController';
// Importa MaquinaController
import MaquinaController from './controllers/MaquinaController';

// Instancia roteador
const Roteador = Router();

Roteador.use(json());
Roteador.get('/funcionarios', new FuncionarioController().index);
Roteador.get('/funcionarios/:id', new FuncionarioController().show);
Roteador.post('/funcionarios', new FuncionarioController().store);
Roteador.put('/funcionarios/:id', new FuncionarioController().update);
Roteador.delete('/funcionarios/:id', new FuncionarioController().delete);
Roteador.put('/funcionarios/maquinas/:id', new FuncionarioController().associarMaquinas);

Roteador.get('/tipos', new TipoController().index);
Roteador.get('/tipos/:id', new TipoController().show);
Roteador.post('/tipos', new TipoController().store);
Roteador.put('/tipos/:id', new TipoController().update);
Roteador.delete('/tipos/:id', new TipoController().delete);

Roteador.get('/maquinas', new MaquinaController().index);
Roteador.get('/maquinas/:id', new MaquinaController().show);
Roteador.post('/maquinas', new MaquinaController().store);
Roteador.put('/maquinas/:id', new MaquinaController().update);
Roteador.delete('/maquinas/:id', new MaquinaController().delete);


export default Roteador;





