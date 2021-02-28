import { DataSource } from 'apollo-datasource';
import UserSqlDatabase from '../dataSources/user/SqlDatabase';
import ProjectSqlDatabase from '../dataSources/project/SqlDatabase';

export type DataSources = {
  sqlUserAPI: DataSource & UserSqlDatabase;
  sqlProjectAPI: DataSource & ProjectSqlDatabase;
};
