import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    sucursalId: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);