import { Request, Response } from 'express'
import { LoginUserInput } from '../dto';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
const secret_token = process.env.ACCESS_TOKEN as string;

export const Login = async(req:Request,res:Response) => {
    const { email,password } = <LoginUserInput>req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(!user){
            res.status(400).json({message:'Invalid username or password.'});
            return;
        }

        const validPass = await bcrypt.compare(password,user.password);
        if(!validPass){
            res.status(400).json({message:'Invalid username or password.'});
            return;
        }
        const token = jwt.sign({user_id:user.id},secret_token,{
            expiresIn: 3600,
        });
        
        res.status(200).json({message:'User logged in successfully.', token});
    }catch(err){
        res.status(500).json({message:'Internal server error.', err});
    }
};