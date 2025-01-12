import {DataTypes,InitOptions,ModelAttributes,Model} from 'sequelize';
import sequelizeConnection from '../database/config';
import Job from './job';

export default class User extends Model {
    static readonly modelName:string = "Users";

    declare id: number;
    declare user_name: string;
    declare email: string;
    declare password: string;
    declare role: string

    static associate(){
      User.hasMany(Job,{foreignKey: "user_id"});
    };

    // Override the toJSON method to exclude unwanted fields
    toJSON() {
      const values = { ...this.get() };  // Get instance data
      delete values.password;           // Remove password field
      delete values.createdAt;         
      delete values.updatedAt;          
      delete values.deletedAt;         
      return values;                  
  }
};

let options:InitOptions = {
    sequelize:sequelizeConnection,
    tableName:User.modelName,
    schema: "public",
    paranoid: true
};

let fields:ModelAttributes = {
    id:{
      type: new DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name:{
      type: new DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: new DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password:{
      type: new DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: new DataTypes.STRING,
      allowNull: false,
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

User.init(fields,options);
