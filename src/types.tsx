export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    address: any[]; //TODO: address interface
    phone: string;
    website: string;
    company: any[]; //TODO: company interface
}
