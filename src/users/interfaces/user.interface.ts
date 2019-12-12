import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly birthdate: Date;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly direction: string;
    readonly city: string;
    readonly region: string;
    readonly contry: string;
    readonly created: Date;
    readonly updated: Date;
    readonly deleted: Date;
    readonly phones: [string];

    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}
