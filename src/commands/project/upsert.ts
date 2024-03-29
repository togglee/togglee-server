import sqlProjectDatabase from '../../dataSources/project/SqlDatabase';
import logger from '../../utils/logger';
import { SimpleResponse } from '../../types/simpleResponse';
import { uploadFile } from '../../utils/fileUploader';

export default async function upsertProject(
  dataSource: sqlProjectDatabase,
  name: string,
  owner: string,
  toggles: any, // eslint-disable-line
  isTestRequest: boolean
): Promise<SimpleResponse> {
  try {
    await uploadFile(name, owner, toggles, isTestRequest);
    await dataSource.upsert(name, owner, toggles, isTestRequest);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
