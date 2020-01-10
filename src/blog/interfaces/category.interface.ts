import { Document } from 'mongoose';

export interface Category extends Document {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly posts: number;
    // readonly author: string;
}
