import { Document } from 'mongoose';

export interface IContact extends Document {
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
}