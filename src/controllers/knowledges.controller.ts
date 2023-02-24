import { Request, Response } from 'express';
import { KnowledgesFileRepo } from '../repository/knowledges.file.repo.js';

export class KnowledgesController {
  constructor(public repo: KnowledgesFileRepo) {
    this.repo = repo;
  }

  getAll(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }
}
