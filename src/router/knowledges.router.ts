import { Router as router } from 'express';
import { KnowledgesController } from '../controllers/knowledges.controller.js';
import { KnowledgesFileRepo } from '../repository/knowledges.file.repo.js';

export const knowledgesRouter = router();

const repo = new KnowledgesFileRepo();

const controller = new KnowledgesController(repo);

knowledgesRouter.get('/', controller.getAll.bind(controller));

knowledgesRouter.get('/:id', controller.get.bind(controller));

knowledgesRouter.post('/', controller.post.bind(controller));

// TEMPORAL: Hasta definir estos métodos.
// knowledgesRouter.patch('/', controller.patch.bind(controller));

// knowledgesRouter.delete('/', controller.delete.bind(controller));
