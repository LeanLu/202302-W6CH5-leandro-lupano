import { Request, Response } from 'express';
import {
  KnowledgesFileRepo,
  KnowledgeStructure,
} from '../repository/knowledges.file.repo.js';

export class KnowledgesController {
  constructor(public repo: KnowledgesFileRepo) {
    this.repo = repo;
  }

  getAll(_req: Request, resp: Response) {
    this.repo.readAll().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    const idNumber = Number(req.params.id);

    this.repo
      .read(idNumber)
      .then((data) =>
        data === undefined
          ? resp
              .status(404)
              .send(`<h1>Sorry, there is no knowledge with this ID<h1>`)
          : resp.status(200).json(data)
      );
  }

  async post(req: Request, resp: Response) {
    const newKnowledge = req.body;
    await this.repo.create(newKnowledge);
    resp.sendStatus(200);
  }

  async patch(req: Request, resp: Response) {
    const newKnowledgeData = req.body as Partial<KnowledgeStructure>;

    const idNumber = newKnowledgeData.id;
    // TEMP: Number(req.params.id)

    if (!idNumber)
      return resp
        .status(404)
        .send(`<h1>Sorry, you need to put the knowledge's ID<h1>`);

    const existingKnowledge = await this.repo.read(idNumber);

    if (!existingKnowledge)
      return resp
        .status(404)
        .send(`<h1>Sorry, there is no knowledge with ID ${idNumber}<h1>`);

    const updatedKnowledge = Object.assign(existingKnowledge, newKnowledgeData);

    await this.repo.update(updatedKnowledge);

    resp.sendStatus(200);
  }

  async delete(req: Request, resp: Response) {
    const idNumber = Number(req.params.id);

    await this.repo.delete(idNumber);

    resp
      .status(200)
      .send(
        `<h1>The knowledge with id ${req.params.id} was deleted successfully<h1>`
      );
  }
}
