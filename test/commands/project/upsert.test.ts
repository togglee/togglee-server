const mockErrorLogger = jest.fn();
const mockUploadFile = jest.fn();

jest.mock('../../../src/utils/logger', () => ({
  __esModule: true,
  default: {
    error: mockErrorLogger,
  },
}));
jest.mock('../../../src/utils/fileUploader', () => ({
  __esModule: true,
  uploadFile: mockUploadFile,
}));

import upsertProject from '../../../src/commands/project/upsert';
import * as faker from 'faker';
import sqlDatabase from '../../../src/dataSources/project/SqlDatabase';

describe('upsert project', () => {
  const sqlDataSource = {
    upsert: jest.fn(),
  };

  const getSqlDataSourceFromMock = (): sqlDatabase =>
    (sqlDataSource as unknown) as sqlDatabase;

  describe('upsert project correctly', () => {
    const name = faker.random.uuid();
    const owner = faker.random.uuid();
    const toggles = faker.random.uuid();
    let result;
    const isTestRequest = false;

    beforeAll(async () => {
      sqlDataSource.upsert.mockReset();
      mockUploadFile.mockReset();
      sqlDataSource.upsert.mockResolvedValue(undefined);
      mockUploadFile.mockResolvedValue(undefined);
      result = await upsertProject(
        getSqlDataSourceFromMock(),
        name,
        owner,
        toggles,
        isTestRequest
      );
    });

    test('should call upload file', () => {
      expect(mockUploadFile).toHaveBeenCalledWith(
        name,
        owner,
        toggles,
        isTestRequest
      );
    });
    test('should call database', () => {
      expect(sqlDataSource.upsert).toHaveBeenCalledWith(
        name,
        owner,
        toggles,
        isTestRequest
      );
    });

    test('should return success response with expected name', () => {
      expect(result).toEqual({ success: true });
    });
  });

  describe('error uploading file project', () => {
    let result;
    const name = faker.random.uuid();
    const owner = faker.random.uuid();
    const toggles = faker.random.uuid();
    const expectedError = faker.random.uuid();
    const isTestRequest = false;

    beforeAll(async () => {
      sqlDataSource.upsert.mockReset();
      mockUploadFile.mockReset();
      mockErrorLogger.mockReset();
      mockUploadFile.mockRejectedValue(expectedError);
      sqlDataSource.upsert.mockResolvedValue(undefined);
      result = await upsertProject(
        getSqlDataSourceFromMock(),
        name,
        owner,
        toggles,
        isTestRequest
      );
    });
    test('should not call database', () => {
      expect(sqlDataSource.upsert).not.toHaveBeenCalledWith(
        name,
        owner,
        toggles,
        isTestRequest
      );
    });

    test('should call error logger with error', () => {
      expect(mockErrorLogger).toHaveBeenCalledWith(expectedError);
    });

    test('should return success response with expected name', () => {
      expect(result).toEqual({ success: false });
    });
  });

  describe('error creating project', () => {
    let result;
    const name = faker.random.uuid();
    const owner = faker.random.uuid();
    const toggles = faker.random.uuid();
    const expectedError = faker.random.uuid();
    const isTestRequest = false;

    beforeAll(async () => {
      sqlDataSource.upsert.mockReset();
      mockErrorLogger.mockReset();
      mockUploadFile.mockReset();
      mockUploadFile.mockResolvedValue(undefined);
      sqlDataSource.upsert.mockRejectedValue(expectedError);
      result = await upsertProject(
        getSqlDataSourceFromMock(),
        name,
        owner,
        toggles,
        isTestRequest
      );
    });
    test('should call database', () => {
      expect(sqlDataSource.upsert).toHaveBeenCalledWith(
        name,
        owner,
        toggles,
        isTestRequest
      );
    });

    test('should call error logger with error', () => {
      expect(mockErrorLogger).toHaveBeenCalledWith(expectedError);
    });

    test('should return success response with expected name', () => {
      expect(result).toEqual({ success: false });
    });
  });
});
