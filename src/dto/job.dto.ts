export interface CreateJobInput {
    title: string;
    type: string;
    description: string;
    location: string;
    salary: string;
    company: company;
    id: number;
};

export interface company {
    name: string;
    description: string;
    contact_email: string;
    contact_phone: string;
    website?: string;
};

