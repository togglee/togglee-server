import sqlToggleDatabase from '../../dataSources/toggle/SqlDatabase';
import logger from '../../utils/logger';
import { SimpleResponse } from '../../types/simpleResponse';

export default async function upsertToggle(
  dataSource: sqlToggleDatabase,
  id: string,
  owner: string,
  toggles: any,
  isTestRequest: boolean
): Promise<SimpleResponse> {
  try {
    await dataSource.upsert(id, owner, toggles, isTestRequest);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
