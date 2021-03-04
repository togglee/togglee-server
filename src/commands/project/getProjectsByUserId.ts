import logger from '../../utils/logger';
import { User } from '../../types/User';
import sqlProjectDatabase from '../../dataSources/project/SqlDatabase';
import { Project } from '../../types/Project';

export default async function getProjectsByUserId(
  dataSource: sqlProjectDatabase,
  userId: string
): Promise<Project[]> {
  try {
    return await dataSource.getProjectsByUserId(userId);
  } catch (error) {
    logger.error(error);
  }
}