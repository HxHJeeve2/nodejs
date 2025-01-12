import { Request,Response } from "express";
import Job from "../models/job";
import { CreateJobInput } from "../dto";
import Company from "../models/company";
import User from "../models/user";


//---------------------------Create Job---------------------------//


export const CreateJob = async (req:Request,res:Response) => {
    const {id,title,type,description,location,salary,company} = <CreateJobInput>req.body;
    try{
        
        // Find user by ID
        let user = await User.findOne({ where: { id: id } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        let companyRecord = await Company.findOne({where:{name:company.name}});
        
        if(!companyRecord){
            companyRecord = await Company.create({
                name: company.name,
                description: company.description,
                contact_email: company.contact_email,
                contact_phone: company.contact_phone,
                website: company.website
            });
        };

        const job = await Job.create({
            title: title,
            type: type,
            description: description,
            location: location,
            salary: salary,
            company_id: companyRecord.id,
            user_id: user.id
        });

        res.status(200).json({message:'Job created successfully.',job});
    }catch(err:unknown){
        res.status(500).json({message:'Internal server error.',err});
    }
};


//---------------------------Get all jobs---------------------------//


export const GetJobs = async(req:Request, res:Response) => {
    try{
        const jobs = await Job.findAll({
            include: [
                {
                    model: Company,
                    attributes: [
                        'id', 'name', 'description', 'contact_email', 'contact_phone', 'website'
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id', 'user_name', 'email'
                    ]
                },
            ]
        });
        if(jobs && jobs.length > 0){
            res.status(200).json(jobs);
        }else{
            res.status(204).json({ message: 'No data available.' });
        }
    }catch(err:unknown){
            res.status(500).json({ message: 'Internal server error.', err });
    }
};


//---------------------------Get job by id---------------------------//


export const GetJobById = async(req:Request, res:Response) => {
    try{
        const {id} = req.params;

        const job = await Job.findOne({
            where:{id: id},
            include: [
                {
                    model: Company,
                    attributes: [
                        'id', 'name', 'description', 'contact_email', 'contact_phone', 'website'
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id', 'user_name', 'email'
                    ]
                },
            ]
        });


        if(!job){
            res.status(404).json({message:'Job not found.'});
            return;
        }else{
            res.status(200).json(job);
        }

    }catch(err:unknown){
        res.status(500).json({message:'Internal server error.', err});
    };
};


//---------------------------Update job---------------------------//


export const UpdateJob = async(req:Request, res:Response) => {
    const { id } = req.params;  
    const updates = req.body; 

    try {
        const job = await Job.findOne({ 
            where: { id: id }, 
            include: Company 
        });

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        if (updates.company) {
            const { company } = updates;

            let companyRecord = await Company.findOne({ where: { name: company.name } });

            if (!companyRecord) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }

            await companyRecord.update({
                name: company.name,
                description: company.description,
                contact_email: company.contact_email,
                contact_phone: company.contact_phone,
                website: company.website
            });

            job.company_id = companyRecord.id;
        }

        await job.update(updates);

        const updatedJob = await Job.findOne({
            where: { id: job.id },
            include: Company
        });

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (err:unknown) {
        res.status(500).json({ message: 'Internal server error.', err });
    }
};


//---------------------------Delete job---------------------------//


export const DeleteJob = async(req:Request, res:Response) => {
    const {id} = req.params;
    try{
       const job = await Job.findOne({where:{id:id}});
       if(!job){
            res.status(404).json({ message: 'Job not found' });
            return;
       }else{
            await job.destroy();
            res.status(200).json({ message: 'Job deleted successfully' });
       }
    }catch(err:unknown){
        res.status(500).json({message:'Internal server error.', err});
    };
};