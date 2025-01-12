import express from 'express';
import {GetJobs} from '../controllers';

const JobsRoute = express.Router();

JobsRoute.get('/',GetJobs);

export default JobsRoute;