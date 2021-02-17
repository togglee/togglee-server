/// <reference types="../../../types/index" />
// import { v4 } from 'uuid';
import { SQLDataSource, DataConfig } from 'datasource-sql';

export default class SqlDatabase extends SQLDataSource {
  saltRounds = 10;

  constructor(config: DataConfig) {
    super(config);
  }

  public async upsert(
    id: string,
    user: string,
    toggles: any,
    isTestRequest: boolean
  ): Promise<void> {
    throw new Error("Not Implemented");
  }
}
