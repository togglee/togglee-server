const mockErrorLogger = jest.fn();

jest.mock('../../../src/utils/logger', () => ({
  __esModule: true,
  default: {
    error: mockErrorLogger,
  },
}));

import validateCredentials from '../../../src/commands/user/validateCredentials';
import * as faker from 'faker';
import sqlDatabase from '../../../src/dataSources/user/SqlDatabase';

describe('validate credentials user', () => {
  const sqlDataSource = {
    validateCredentials: jest.fn(),
  };

  const getSqlDataSourceFromMock = (): sqlDatabase =>
    (sqlDataSource as unknown) as sqlDatabase;

  describe('validate credentials correctly', () => {
    let result;
    const email = faker.random.uuid();
    const password = faker.random.uuid();

    beforeAll(async () => {
      sqlDataSource.validateCredentials.mockReset();
      sqlDataSource.validateCredentials.mockResolvedValue(undefined);
      result = await validateCredentials(
        getSqlDataSourceFromMock(),
        email,
        password
      );
    });

    test('should call database', () => {
      expect(sqlDataSource.validateCredentials).toHaveBeenCalledWith(
        email,
        password
      );
    });

    test('should return success response with expected id', () => {
      expect(result).toEqual({ success: true });
    });
  });

  describe('error creating user', () => {
    let result;
    const expectedError = faker.random.uuid();
    const email = faker.random.uuid();
    const password = faker.random.uuid();
    const isTestRequest = false;

    beforeAll(async () => {
      sqlDataSource.validateCredentials.mockReset();
      mockErrorLogger.mockReset();
      sqlDataSource.validateCredentials.mockRejectedValue(expectedError);
      result = await validateCredentials(
        getSqlDataSourceFromMock(),
        email,
        password
      );
    });
    test('should call database', () => {
      expect(sqlDataSource.validateCredentials).toHaveBeenCalledWith(
        email,
        password
      );
    });

    test('should call error logger with error', () => {
      expect(mockErrorLogger).toHaveBeenCalledWith(expectedError);
    });

    test('should return success response with expected id', () => {
      expect(result).toEqual({ success: false });
    });
  });
});
