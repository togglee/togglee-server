import create from '../../commands/user/create';
import validateCredentials from '../../commands/user/validateCredentials';
import getUserById from '../../commands/user/getUserById';
import UserResolver from '../../types/UserResolver';
import { DataSources } from '../../types/DataSources';

export default ({
  Query: {
    user: async (
      _,
      { id }: { id: string },
      { dataSources }: { dataSources: DataSources }
    ) => await getUserById(dataSources.sqlUserAPI, id),
  },
  Mutation: {
    createUser: async (
      _,
      { email, password }: { email: string; password: string },
      {
        dataSources,
        isTestRequest,
      }: { dataSources: DataSources; isTestRequest: boolean }
    ) => await create(dataSources.sqlUserAPI, email, password, isTestRequest),
    validateCredentialsUser: async (
      _,
      { email, password }: { email: string; password: string },
      { dataSources }: { dataSources: DataSources }
    ) => await validateCredentials(dataSources.sqlUserAPI, email, password),
  },
} as unknown) as UserResolver;
