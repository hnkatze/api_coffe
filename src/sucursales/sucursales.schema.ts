import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Sucursales {
    @Prop({ required: true })
    readonly name: string;

    @Prop({ required: true })
    readonly longitude: number;

    @Prop({ required: true })
    readonly latitude: number;

    @Prop({ required: true })
    readonly radius: number;
}

export type SucursalesDocument = Sucursales & Document;
export const SucursalesSchema = SchemaFactory.createForClass(Sucursales);
