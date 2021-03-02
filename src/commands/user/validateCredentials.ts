import sqlUserDatabase from '../../dataSources/user/SqlDatabase';
import logger from '../../utils/logger';
import { WithIdResponse } from '../../types/WithIdResponse';

export default async function validateCredentials(
  dataSource: sqlUserDatabase,
  email: string,
  password: string
): Promise<WithIdResponse> {
  try {
    const result = await dataSource.getWithEmailAndPassword(email, password);
    return { success: true, id: result.id };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
