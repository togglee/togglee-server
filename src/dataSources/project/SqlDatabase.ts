/// <reference types="../../../types/index" />
import { v4 } from 'uuid';
import { SQLDataSource, DataConfig } from 'datasource-sql';

export default class SqlDatabase extends SQLDataSource {
  saltRounds = 10;

  constructor(config: DataConfig) {
    super(config);
  }

  public async upsert(
    user: string,
    name: string,
    toggles: any,
    isTestRequest: boolean
  ): Promise<void> {
    const id = v4();
    await this.db
    .insert({
      id,
      name,
      user,
      toggles,
      isTest: isTestRequest ? 1 : 0,
    })
    .into('PROJECTS');
  }
}
