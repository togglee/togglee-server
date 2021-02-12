import { DataSource } from 'apollo-datasource';
import UserSqlDatabase from '../dataSources/user/SqlDatabase';

export type DataSources = {
  sqlUserAPI: DataSource & UserSqlDatabase;
};
