import { IsEmail, IsNotEmpty, IsDate } from 'class-validator';
export class UserDto {
    readonly firstname: string;
    readonly lastname: string;
    @IsDate()
    readonly birthdate: Date;

    @IsEmail()
    readonly email: string;
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
    readonly address: {
        readonly number: number;
        readonly street: string;
        readonly city: string;
        readonly region: string;
        readonly contry: string;
    };
    readonly created: Date;
    readonly updated: Date;
    readonly deleted: Date;
    readonly phones: [string];
    readonly permisions: {
        user: boolean,
        admin: boolean,
        super: boolean,
    };

}
