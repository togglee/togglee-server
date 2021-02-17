import { DataSource } from 'apollo-datasource';
import SqlUserDatabase from './user/SqlDatabase';
import SqlToggleDatabase from './toggle/SqlDatabase';
import { DataSources } from '../types/DataSources';
import { DataConfig } from 'datasource-sql';

let sqlAPIConfig: DataConfig = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  searchPath: ['salesforce', 'public'],
  wrapIdentifier: (value) => value,
};

if (process.env.NODE_ENV !== 'production')
  sqlAPIConfig = {
    client: 'sqlite3',
    connection: {
      filename: './local.sqlite',
    },
    useNullAsDefault: true,
  };

const sqlUserAPI = new SqlUserDatabase(sqlAPIConfig) as DataSource;
const sqlToggleAPI = new SqlToggleDatabase(sqlAPIConfig) as DataSource;

export default {
  sqlUserAPI,
  sqlToggleAPI,
} as DataSources;
