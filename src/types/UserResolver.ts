import { IResolverObject } from 'apollo-server-express';

export type UserResolver = {
  Query: Record<string, unknown>;
  Mutation: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
    createUser: IResolverObject<any, any, any> & Function;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
    validateCredentialsUser: IResolverObject<any, any, any> & Function;
  };
};

export default UserResolver;
