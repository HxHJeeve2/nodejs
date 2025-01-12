// associations.ts
import Job from './job';
import Company from './company';
import User from './user';

export const associateModels = () => {
  Job.associate();
  Company.associate();
  User.associate();
};