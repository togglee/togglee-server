import upsert from '../../commands/toggle/upsert';
import ToggleResolver from '../../types/ToggleResolver';
import { DataSources } from '../../types/DataSources';

export default ({
  Query: {},
  Mutation: {
    upsertToggle: async (
      _,
      { id, owner, toggles }: { id:string; owner: string; toggles: any },
      {
        dataSources,
        isTestRequest,
      }: { dataSources: DataSources; isTestRequest: boolean }
    ) => await upsert(dataSources.sqlToggleAPI, id, owner, toggles, isTestRequest),
  },
} as unknown) as ToggleResolver;
