import { DataSource } from 'apollo-datasource';
import UserSqlDatabase from '../dataSources/user/SqlDatabase';
import ToggleSqlDatabase from '../dataSources/toggle/SqlDatabase';

export type DataSources = {
  sqlUserAPI: DataSource & UserSqlDatabase;
  sqlToggleAPI: DataSource & ToggleSqlDatabase;
};
