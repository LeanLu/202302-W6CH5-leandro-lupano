import { KnowledgesFileRepo } from '../repository/knowledges.file.repo';
import { KnowledgesController } from './knowledges.controller';
import { NextFunction, Request, Response } from 'express';

describe('Given the KnowledgesController', () => {
  const repo: KnowledgesFileRepo = {
    query: jest.fn(),
    queryId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const req = {
    body: {
      id: '1',
    },
    params: { id: '1' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;

  const controller = new KnowledgesController(repo);

  describe('When getAll method is called', () => {
    test('Then if there is NO error from the repo', async () => {
      await controller.getAll(req, resp, next);

      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is an error from the repo', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);

      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When get method is called', () => {
    test('Then if there is NO error from the repo', async () => {
      await controller.get(req, resp, next);

      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is an error from the repo', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);

      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When post method is called', () => {
    test('Then if there is NO error from the repo', async () => {
      await controller.post(req, resp, next);

      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is an error from the repo', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);

      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When patch method is called', () => {
    test('Then if there is NO error from the repo and the body`s id is different than params`ones', async () => {
      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is an error from the repo', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then if there is NO error from the repo and the body`s id is the same than params`ones', async () => {
      const req = {
        body: {
          id: '3',
        },
        params: { id: '' },
      } as unknown as Request;

      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When delete method is called', () => {
    test('Then if there is NO error from the repo', async () => {
      await controller.delete(req, resp, next);

      expect(repo.destroy).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is an error from the repo', async () => {
      (repo.destroy as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);

      expect(repo.destroy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
