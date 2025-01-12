import express from 'express';
import { CreateJob } from '../controllers';
import { GetJobById } from '../controllers';
import { UpdateJob } from '../controllers';
import { DeleteJob } from '../controllers';

const JobRoute = express.Router();

JobRoute.post('/',CreateJob);
JobRoute.get('/:id',GetJobById);
JobRoute.patch('/:id',UpdateJob);
JobRoute.delete('/:id',DeleteJob);

export default JobRoute;