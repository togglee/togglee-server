import sqlProjectDatabase from '../../dataSources/project/SqlDatabase';
import logger from '../../utils/logger';
import { SimpleResponse } from '../../types/simpleResponse';

export default async function upsertToggle(
  dataSource: sqlProjectDatabase,
  name: string,
  owner: string,
  toggles: any,
  isTestRequest: boolean
): Promise<SimpleResponse> {
  try {
    await dataSource.upsert(name, owner, toggles, isTestRequest);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
