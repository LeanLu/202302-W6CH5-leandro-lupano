import fs from 'fs/promises';

const file = './data/data.json';

export class KnowledgesFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as { [key: string]: string | number }[]);
  }

  create() {}
}
