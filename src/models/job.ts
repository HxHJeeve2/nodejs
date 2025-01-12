import { DataTypes, InitOptions, ModelAttributes, Model } from 'sequelize';
import sequelizeConnection from '../database/config';
import Company from './company';
import User from './user';


export default class Job extends Model {
    static readonly modelName:string = "Jobs";

    declare id: number;
    declare title: string;
    declare type: string;
    declare description: string;
    declare location: string;
    declare salary: string;
    declare company_id: number;
    declare user_id: number;

    static associate(){
        Job.belongsTo(Company,{foreignKey: "company_id"});
        Job.belongsTo(User,{foreignKey:"user_id"});
    };
    
};

let options:InitOptions = {
    sequelize: sequelizeConnection,
    tableName: Job.modelName,
    schema: "public",
    paranoid: true
};

let fields:ModelAttributes = {
    id:{
        type: new DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: new DataTypes.STRING,
        allowNull: false
    },
    type:{
        type: new DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: new DataTypes.STRING,
        allowNull: false
    },
    location:{
        type: new DataTypes.STRING,
        allowNull: false
    },
    salary:{
        type: new DataTypes.STRING,
        allowNull: false
    },
    company_id:{
        type: new DataTypes.INTEGER,
        allowNull:false
    },
    user_id:{
        type: new DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:{
        type: new DataTypes.DATE,
        allowNull: true,
    },
    updatedAt:{
        type: new DataTypes.DATE,
        allowNull: true,
    },
    deletedAt:{
        type: new DataTypes.DATE,
        allowNull: true,
    }
    
};

Job.init(fields,options);