import { User } from "./user";


export interface AuthUser{
    user:       User | null;
    token:      string | null;
    status:     'checking' | 'authenticated' | 'not-authenticated';
}