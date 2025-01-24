import { ObjectId } from "mongoose";



export class CreateEmployeeDto {
    readonly name: string;
    readonly password: string;
    readonly role: roleDto;
    readonly sucursalId: ObjectId;
}


export class roleDto {
    readonly role: 'admin' |'gerent' | 'cashier' | 'kitchen' | 'drinks';
}