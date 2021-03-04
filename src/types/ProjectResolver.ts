import { IResolverObject } from 'apollo-server-express';

export type ProjectResolver = {
  Query: Record<string, unknown>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
  projects: IResolverObject<any, any, any> & Function;
  Mutation: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
    upsertProject: IResolverObject<any, any, any> & Function;
  };
};

export default ProjectResolver;
