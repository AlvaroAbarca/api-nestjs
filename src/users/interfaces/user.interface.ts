import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly birthdate: Date;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly address: {
        number: string,
        street: string,
        city: string,
        region: string,
        contry: string,
    };
    readonly phones: [string];
    readonly roles: [string];

}
