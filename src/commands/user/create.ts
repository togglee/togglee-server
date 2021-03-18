import sqlUserDatabase from '../../dataSources/user/SqlDatabase';
import logger from '../../utils/logger';
import { SimpleResponse } from '../../types/simpleResponse';

export default async function createUser(
  dataSource: sqlUserDatabase,
  email: string,
  password: string,
  isTestRequest: boolean
): Promise<SimpleResponse> {
  try {
    await dataSource.create(email, password, isTestRequest);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
