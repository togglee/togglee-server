/// <reference types="../../../types/index" />
import { v4 } from 'uuid';
import { SQLDataSource, DataConfig } from 'datasource-sql';
import { hash, compare } from 'bcrypt';
import { User } from '../../types/User';

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
        istest: isTestRequest ? 1 : 0,
      })
      .into('USERS');
  }

  public async getWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const queryResult = await this.db
      .select('*')
      .from('USERS')
      .where({ email });
    if (
      queryResult.length !== 0 &&
      (await compare(password, queryResult[0].password))
    )
      return queryResult[0];
    else throw new Error('User or credentials do not match');
  }

  public async getUserById(id: string): Promise<User> {
    const queryResult = await this.db.select('*').from('USERS').where({ id });
    if (queryResult.length !== 0) return queryResult[0];
    throw new Error('Unable To find user');
  }
}
