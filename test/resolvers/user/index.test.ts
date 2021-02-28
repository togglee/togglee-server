const mockCreateUser = jest.fn();
const mockvalidateCredentialsUser = jest.fn();

jest.mock('../../../src/commands/user/create', () => ({
  __esModule: true,
  default: mockCreateUser,
}));

jest.mock('../../../src/commands/user/validateCredentials', () => ({
  __esModule: true,
  default: mockvalidateCredentialsUser,
}));

import resolvers from '../../../src/resolvers/user';
import * as faker from 'faker';
import { DataSources } from '../../../src/types/DataSources';

describe('user resolvers', () => {
  const email = faker.random.uuid();
  const password = faker.random.uuid();
  const dataSources: DataSources = {
    sqlUserAPI: faker.random.uuid(),
    sqlProjectAPI: faker.random.uuid(),
  };

  beforeAll(() => {
    mockCreateUser.mockReset();
    mockvalidateCredentialsUser.mockReset();
  });

  describe('Mutation', () => {
    describe('Create', () => {
      test('should have create with the call to sqlDatabase with parameters', async () => {
        await resolvers.Mutation.createUser(
          undefined,
          { email, password },
          { dataSources, isTestRequest: true }
        );
        expect(mockCreateUser).toHaveBeenCalledWith(
          dataSources.sqlUserAPI,
          email,
          password,
          true
        );
      });
    });

    describe('validateCredentials', () => {
      test('should have validateCredentials with the call to sqlDatabase with parameters', async () => {
        await resolvers.Mutation.validateCredentialsUser(
          undefined,
          { email, password },
          { dataSources }
        );
        expect(mockvalidateCredentialsUser).toHaveBeenCalledWith(
          dataSources.sqlUserAPI,
          email,
          password
        );
      });
    });
  });
});
