import { Request, Response } from 'express';
import { KnowledgesFileRepo } from '../repository/knowledges.file.repo.js';

export class KnowledgesController {
  constructor(public repo: KnowledgesFileRepo) {
    this.repo = repo;
  }

  getAll(req: Request, resp: Response) {
    this.repo.readAll().then((data) => {
      resp.json(data);
    });
  }

  // TEMPORAL: Hasta definir cada método.
  // get(req: Request, resp: Response) {
  //   this.repo.read().then((data) => {
  //     resp.json(data);
  //   });
  // }

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
