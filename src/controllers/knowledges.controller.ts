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
    this.repo
      .readAll()
      .then((data) =>
        data === undefined
          ? resp
              .status(500)
              .send(`<h1>Sorry, the knowledges can not be loaded<h1>`)
          : resp.status(200).json(data)
      );
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
    const newKnowledgeData = (await req.body) as Partial<KnowledgeStructure>;

    const idNumber = newKnowledgeData.id;

    if (idNumber === undefined)
      return resp
        .status(406)
        .send(`<h1>Sorry, you need to put the knowledge's ID<h1>`);

    const existingKnowledge = await this.repo.read(idNumber);

    if (!existingKnowledge)
      return resp
        .status(404)
        .send(`<h1>Sorry, there is no knowledge with ID: ${idNumber}<h1>`);

    const updatedKnowledge = Object.assign(existingKnowledge, newKnowledgeData);

    await this.repo.update(updatedKnowledge);

    resp.sendStatus(200);
  }

  async delete(req: Request, resp: Response) {
    const idNumber = Number(req.params.id);

    const existingKnowledge = await this.repo.read(idNumber);

    if (!existingKnowledge)
      return resp
        .status(404)
        .send(`<h1>Sorry, there is no knowledge with ID: ${idNumber}<h1>`);

    await this.repo.delete(idNumber);

    resp
      .status(200)
      .send(
        `<h1>The knowledge with id ${req.params.id} was deleted successfully<h1>`
      );
  }

  // TEMPORAL: Prueba para chequeo de búsqueda de knowledge undefined:
  // checkData(
  //   data: KnowledgeStructure | KnowledgeStructure[],
  //   resp: Response,
  //   message: string
  // ) {
  //   if (data === undefined) return resp.status(404).send(message);
  //   return resp.json(data);
  // }

  // TEMPORAL: Para chequeo de búsqueda por ID de knowledge undefined:
  // checkExistingKnowledge(
  //   knowledge: KnowledgeStructure,
  //   resp: Response,
  //   idNumber: number
  // ) {
  //   if (!knowledge)
  //     return resp
  //       .status(404)
  //       .send(`<h1>Sorry, there is no knowledge with ID: ${idNumber}<h1>`);
  // }
}
