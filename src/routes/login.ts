import express from 'express';
import {Login} from '../controllers';

const LoginRoute = express.Router();

LoginRoute.post('/',Login);

export default LoginRoute;