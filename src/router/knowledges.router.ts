/* eslint-disable new-cap */
import { Router } from 'express';
import { KnowledgesController } from '../controllers/knowledges.controller.js';
import { KnowledgesFileRepo } from '../repository/knowledges.file.repo.js';

export const knowledgesRouter = Router();

const repo = new KnowledgesFileRepo();

const controller = new KnowledgesController(repo);

knowledgesRouter.get('/', controller.getAll.bind(controller));
