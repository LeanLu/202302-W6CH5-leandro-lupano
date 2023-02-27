import fs from 'fs/promises';
import { KnowledgeStructure } from '../entities/knowledge.model';
import { Repo } from './repo.interface';

const file = './data/data.json';

export class KnowledgesFileRepo implements Repo<KnowledgeStructure> {
  async query(): Promise<KnowledgeStructure[]> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(initialData);

    // EJEMPLO si fuese .then() para tener el caso:
    // readAll() {
    //   return fs
    //     .readFile(file, { encoding: 'utf-8' })
    //     .then((data) => JSON.parse(data) as KnowledgeStructure[]);
  }

  async queryId(id: string): Promise<KnowledgeStructure> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: KnowledgeStructure[] = JSON.parse(initialData);

    const finalData = data.find((item) => item.id === id);

    if (!finalData) throw new Error('Id not found');

    return finalData;
  }

  async create(
    knowledge: Partial<KnowledgeStructure>
  ): Promise<KnowledgeStructure> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: KnowledgeStructure[] = JSON.parse(initialData);

    knowledge.id = String(Math.floor(Math.random() * 1_000_000));

    // Si el ID fuese number, podría ser:
    // const newId: number =
    //   data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;

    // knowledge.id = newId + 1;

    const finalData = [...data, knowledge];

    const stringFinalData = JSON.stringify(finalData);

    await fs.writeFile(file, stringFinalData, 'utf-8');

    return knowledge as KnowledgeStructure;
  }

  async update(
    knowledge: Partial<KnowledgeStructure>
  ): Promise<KnowledgeStructure> {
    if (!knowledge.id) throw new Error('Not valid data');
    const initialData: string = await fs.readFile(file, {
      encoding: 'utf-8',
    });
    const data: KnowledgeStructure[] = JSON.parse(initialData);
    let updateItem: KnowledgeStructure = {} as KnowledgeStructure;
    const finalData = data.map((item) => {
      if (item.id === knowledge.id) {
        updateItem = { ...item, ...knowledge };
        return updateItem;
      }

      return item;
    });

    if (!updateItem.id) throw new Error('Id not found');
    const stringFinalData = JSON.stringify(finalData);
    await fs.writeFile(file, stringFinalData, 'utf-8');
    return updateItem as KnowledgeStructure;
  }

  async destroy(id: string): Promise<void> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: KnowledgeStructure[] = JSON.parse(initialData);

    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found');

    data.slice(index, 1);

    const stringFinalData = JSON.stringify(data);
    await fs.writeFile(file, stringFinalData, 'utf-8');
  }
}
