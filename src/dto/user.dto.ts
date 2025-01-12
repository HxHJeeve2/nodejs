export interface CreateUserInput {
    user_name: string;
    email: string;
    password: string;
    role: string;
};

export interface LoginUserInput{
    email: string;
    password: string;
};