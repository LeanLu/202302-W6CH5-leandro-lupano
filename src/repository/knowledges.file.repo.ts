/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

const file = './data/data.json';

export type KnowledgeStructure = {
  id: number;
  name: string;
};

export interface KnowledgesRepoStructure {
  readAll(): Promise<KnowledgeStructure[]>;
  read(id: KnowledgeStructure['id']): Promise<KnowledgeStructure>;
  create(knowledge: KnowledgeStructure): Promise<void>;
  update(knowledge: KnowledgeStructure): Promise<void>;
  delete(knowledge: KnowledgeStructure['id']): Promise<void>;
}

export class KnowledgesFileRepo implements KnowledgesRepoStructure {
  readAll() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as KnowledgeStructure[]);
  }

  async read(id: KnowledgeStructure['id']) {
    const stringInitialData = await fs.readFile(file, {
      encoding: 'utf-8',
    });

    const data: KnowledgeStructure[] = JSON.parse(stringInitialData);

    return data.filter((item) => item.id === id)[0];
  }

  async create(knowledge: KnowledgeStructure) {
    const stringInitialData = await fs.readFile(file, {
      encoding: 'utf-8',
    });

    const data: KnowledgeStructure[] = JSON.parse(stringInitialData);

    const newId: number =
      data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;

    knowledge.id = newId + 1;

    const stringFinalData = JSON.stringify([...data, knowledge]);

    await fs.writeFile(file, stringFinalData, {
      encoding: 'utf-8',
    });
  }

  async update(knowledge: KnowledgeStructure) {
    const stringInitialData = await fs.readFile(file, {
      encoding: 'utf-8',
    });

    const data: KnowledgeStructure[] = JSON.parse(stringInitialData);

    const dataEdited = data.map((item) =>
      item.id === knowledge.id ? knowledge : item
    );

    const stringFinalData = JSON.stringify(dataEdited);

    await fs.writeFile(file, stringFinalData, {
      encoding: 'utf-8',
    });
  }

  async delete(knowledge: KnowledgeStructure['id']) {}
}
