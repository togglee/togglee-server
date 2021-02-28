import user from './user';
import project from './project';

const Query = { ...user.Query, ...project.Query };
const Mutation = { ...user.Mutation, ...project.Mutation };

export default {
  Query,
  Mutation,
};
