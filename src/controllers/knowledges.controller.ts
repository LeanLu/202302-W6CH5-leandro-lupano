import { Request, Response } from 'express';
import { KnowledgesFileRepo } from '../repository/knowledges.file.repo.js';

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
    await this.repo.create(req.body);
    resp.sendStatus(200);
  }

  // TEMPORAL:
  // post(req: Request, resp: Response) {
  //   this.repo.create(req.body).then((data) => {
  //     resp.json(data);
  //   });
  // }

  // TEMPORAL: Hasta definir cada método.
  // patch(req: Request, resp: Response) {
  //   this.repo.read().then((data) => {
  //     resp.json(data);
  //   });
  // }

  // delete(req: Request, resp: Response) {
  //   this.repo.read().then((data) => {
  //     resp.json(data);
  //   });
  // }
}
