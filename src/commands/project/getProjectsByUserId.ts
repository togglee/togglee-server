import logger from '../../utils/logger';
import sqlProjectDatabase from '../../dataSources/project/SqlDatabase';
import { Project } from '../../types/Project';

const baseUrl = 'https://togglee-toggles.ams3.digitaloceanspaces.com';
// https://togglee-toggles.ams3.digitaloceanspaces.com/869743b0-b854-415b-9caf-81748da8bd31/default.json
export default async function getProjectsByUserId(
  dataSource: sqlProjectDatabase,
  userId: string
): Promise<Project[]> {
  try {
    const projects = await dataSource.getProjectsByUserId(userId);
    return projects.map((project) => ({
      ...project,
      url: `${baseUrl}/${project.owner}/${project.name}.json`,
    }));
  } catch (error) {
    logger.error(error);
  }
}
