import { DataTypes,InitOptions,ModelAttributes,Model } from 'sequelize';
import sequelizeConnection from '../database/config';
import Job from './job';

export default class Company extends Model {
    static readonly modelName: string = "Companies";

    declare id: number;
    declare name: string;
    declare description: string;
    declare contact_email: string;
    declare contact_phone: string;
    declare website?: string;

    static associate(){
        Company.hasMany(Job,{foreignKey:"company_id"});
    };
};

let options: InitOptions = {
    sequelize: sequelizeConnection,
    modelName: Company.modelName,
    schema: "public",
    paranoid: true
}

let field: ModelAttributes = {
    id:{
        type: new DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: new DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: new DataTypes.STRING,
        allowNull: false,
    },
    contact_email:{
        type: new DataTypes.STRING,
        allowNull: false,
    },
    contact_phone:{
        type: new DataTypes.STRING,
        allowNull: false,
    },
    website:{
        type: new DataTypes.STRING,
        allowNull: true,
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

Company.init(field,options);