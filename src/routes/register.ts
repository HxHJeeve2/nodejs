import express from 'express';
import {CreateUser} from '../controllers';

const RegisterRoute = express.Router();

RegisterRoute.post('/',CreateUser);

export default RegisterRoute;