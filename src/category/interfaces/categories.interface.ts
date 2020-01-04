import { Document } from 'mongoose';

export interface Category extends Document {
    readonly title: string;
    readonly description: string;
    readonly created: Date;
    readonly updated: Date;
    readonly deleted: Date;
}