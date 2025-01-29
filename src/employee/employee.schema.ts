import { Prop, Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';


export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sucursales', required: true })
    sucursalId: MongooseSchema.Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);