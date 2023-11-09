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

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string, lng: string };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address[];
    phone: string;
    website: string;
    company: Company[];
}