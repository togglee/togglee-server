import upsert from '../../commands/project/upsert';
import ProjectResolver from '../../types/ProjectResolver';
import { DataSources } from '../../types/DataSources';
import { User } from '../../types/User';
import getProjectsByUserId from '../../commands/project/getProjectsByUserId';
import logger from '../../utils/logger';

export default ({
  Query: {},
  projects: async (
    user: User,
    _,
    {
      dataSources,
    }: { dataSources: DataSources }
    ) =>  await getProjectsByUserId(dataSources.sqlProjectAPI, user.id)
  ,
  Mutation: {
    upsertProject: async (
      _,
      { name, owner, toggles }: { name: string; owner: string; toggles: any }, // eslint-disable-line
      {
        dataSources,
        isTestRequest,
      }: { dataSources: DataSources; isTestRequest: boolean }
    ) =>
      await upsert(
        dataSources.sqlProjectAPI,
        name,
        owner,
        toggles,
        isTestRequest
      ),
  },
} as unknown) as ProjectResolver;
