/// <reference types="../../../types/index" />
import { v4 } from 'uuid';
import { SQLDataSource, DataConfig } from 'datasource-sql';
import { hash, compare } from 'bcrypt';

export default class SqlDatabase extends SQLDataSource {
  saltRounds = 10;

  constructor(config: DataConfig) {
    super(config);
  }

  public async create(
    email: string,
    password: string,
    isTestRequest: boolean
  ): Promise<void> {
    const id = v4();
    const hashPassword = await hash(password, this.saltRounds);
    await this.db
      .insert({
        id,
        email,
        password: hashPassword,
        isTest: isTestRequest ? 1 : 0,
      })
      .into('USERS');
  }

  public async validateCredentials(
    email: string,
    password: string
  ): Promise<boolean> {
    const queryResult = await this.db
      .select('*')
      .from('USERS')
      .where({ email });
    return (
      queryResult.length !== 0 &&
      (await compare(password, queryResult[0].password))
    );
  }
}
