/// <reference types="../../../types/index" />
import { v4 } from 'uuid';
import { SQLDataSource, DataConfig } from 'datasource-sql';
import { DBProject } from '../../types/Project';

export default class SqlDatabase extends SQLDataSource {
  constructor(config: DataConfig) {
    super(config);
  }

  public async upsert(
    name: string,
    user: string,
    toggles: any, // eslint-disable-line
    isTestRequest: boolean
  ): Promise<void> {
    const id = v4();
    try {
      await this.db
        .insert({
          id,
          name,
          userreference: user,
          toggles: JSON.stringify(toggles),
          istest: isTestRequest ? 1 : 0,
        })
        .into('PROJECTS');
    } catch (error) {
      await this.db('PROJECTS')
        .update({
          toggles: JSON.stringify(toggles),
        })
        .where({
          name,
          userReference: user,
        });
    }
  }

  public async getProjectsByUserId(userId: string): Promise<DBProject[]> {
    console.log(`getting projects for ${userId}`);
    const queryResult = await this.db
      .select('*')
      .from('PROJECTS')
      .where({ userReference: userId });
    console.log('the query result is:');
    console.log(queryResult);
    return queryResult.map((dbProject) => ({
      name: dbProject.name,
      id: dbProject.id,
      owner: dbProject.userreference,
      toggles: JSON.parse(dbProject.toggles),
      isTest: dbProject.istest,
    }));
  }
}
