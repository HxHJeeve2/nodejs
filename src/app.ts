import express, { Application, Request, Response } from "express";
import cors from 'cors';
import fs from 'fs';
import path from 'path'
import {associateModels} from './models/associations';
import RouterMiddleware from "./middlewares/middleware";

const routesPath = path.join(__dirname,'routes');

const createApp = (): Application => {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get('/',(req:Request,res:Response) => {
        try{
            res.status(200).json("Your server is ready");
        }catch(err){
            res.status(500).json(err);
        }
    });

    associateModels(); // Set up associations

    //Dynamically load and register all route files
    fs.readdirSync(routesPath).forEach((file)=>{
        if(file.endsWith('.ts') || file.endsWith('.js')){
            const route = require(path.join(routesPath,file));
            if(route.default){
                const routePath = `/${file.split('.')[0]}`;

                 // Skip middleware for login and register routes
                if(routePath!== '/login' && routePath !=='/register'){
                    app.use(routePath, RouterMiddleware.routerMiddleware);
                };

                app.use(routePath,route.default);
            }
        }
    });

    return app;
};

export default createApp;