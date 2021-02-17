const mockUpsertToggle = jest.fn();

jest.mock('../../../src/commands/toggle/upsert', () => ({
  __esModule: true,
  default: mockUpsertToggle,
}));

import resolvers from '../../../src/resolvers/toggle';
import * as faker from 'faker';
import { DataSources } from '../../../src/types/DataSources';

describe('user resolvers', () => {
  const id = faker.random.uuid();
  const owner = faker.random.uuid();
  const toggles = faker.random.uuid();
  const dataSources: DataSources = {
    sqlUserAPI: faker.random.uuid(),
    sqlToggleAPI: faker.random.uuid(),
  };

  beforeAll(() => {
    mockUpsertToggle.mockReset();
  });

  describe('Mutation', () => {
    describe('Upsert', () => {
      test('should have create with the call to sqlDatabase with parameters', async () => {
        await resolvers.Mutation.upsertToggle(
          undefined,
          { id, owner, toggles },
          { dataSources, isTestRequest: true }
        );
        expect(mockUpsertToggle).toHaveBeenCalledWith(
          dataSources.sqlToggleAPI,
          id, 
          owner, 
          toggles,
          true
        );
      });
    });
  });
});
