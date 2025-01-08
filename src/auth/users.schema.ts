import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    userId: string; 
}
export const UserSchema = SchemaFactory.createForClass(User);