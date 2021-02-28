const mockUpsertProject = jest.fn();

jest.mock('../../../src/commands/project/upsert', () => ({
  __esModule: true,
  default: mockUpsertProject,
}));

import resolvers from '../../../src/resolvers/project';
import * as faker from 'faker';
import { DataSources } from '../../../src/types/DataSources';

describe('project resolvers', () => {
  const name = faker.random.uuid();
  const owner = faker.random.uuid();
  const toggles = faker.random.uuid();
  const dataSources: DataSources = {
    sqlUserAPI: faker.random.uuid(),
    sqlToggleAPI: faker.random.uuid(),
  };

  beforeAll(() => {
    mockUpsertProject.mockReset();
  });

  describe('Mutation', () => {
    describe('Upsert', () => {
      test('should have create with the call to sqlDatabase with parameters', async () => {
        await resolvers.Mutation.upsertToggle(
          undefined,
          { name, owner, toggles },
          { dataSources, isTestRequest: true }
        );
        expect(mockUpsertProject).toHaveBeenCalledWith(
          dataSources.sqlToggleAPI,
          name, 
          owner, 
          toggles,
          true
        );
      });
    });
  });
});
