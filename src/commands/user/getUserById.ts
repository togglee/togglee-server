import sqlUserDatabase from '../../dataSources/user/SqlDatabase';
import logger from '../../utils/logger';
import { User } from '../../types/User';

export default async function getUserById(
  dataSource: sqlUserDatabase,
  id: string
): Promise< User | void > {
  try {
    return await dataSource.getUserById(id);
  } catch (error) {
    logger.error(error);
  }
}