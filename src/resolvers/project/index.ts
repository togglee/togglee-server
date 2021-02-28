import upsert from '../../commands/project/upsert';
import ProjectResolver from '../../types/ProjectResolver';
import { DataSources } from '../../types/DataSources';

export default ({
  Query: {},
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
