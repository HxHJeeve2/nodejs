import bcrypt from 'bcrypt';

export const GeneratePassword = async (password:string) => {
    return await bcrypt.hash(password,10);
};