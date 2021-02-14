import sqlUserDatabase from '../../dataSources/user/SqlDatabase';
import logger from '../../utils/logger';
import { SimpleResponse } from '../../types/simpleResponse';

export default async function validateCredentials(
  dataSource: sqlUserDatabase,
  email: string,
  password: string
): Promise<SimpleResponse> {
  try {
    return { success: await dataSource.validateCredentials(email, password) };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
