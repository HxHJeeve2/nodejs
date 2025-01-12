import { Response, Request } from "express";
import User from '../models/user';
import { CreateUserInput } from "../dto";
import { GeneratePassword } from "../utils";
import { ValidateSchema,CreateUserSchema } from "../utils";

export const CreateUser = async (req:Request, res:Response) => {

     // Validate the input using Joi schema
    const { error } = ValidateSchema(CreateUserSchema,req.body);
    
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    const { user_name,email,password,role } = <CreateUserInput>req.body;
    try {
        const ExistingEmail = await User.findOne({where:{email:email}});

        if(ExistingEmail){
           res.status(409).json({message:'Email already exist.'});
           return;
        };

        const userPass = await GeneratePassword(password);

        const user = await User.create({
            user_name: user_name,
            email: email,
            password: userPass,
            role: role
        });
        res.json({message:'user created successfully.',user});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.',err });
    }
}
