import { Prop, SchemaFactory } from "@nestjs/mongoose";



export type SucursalesDocument = Sucursales & Document;

export class Sucursales {
    @Prop()
    readonly name: string;

    @Prop()
    readonly address: string;

    @Prop()
    readonly phone: string;

    @Prop()
    readonly lat: number;

    @Prop()
    readonly long: number;
}

export const SucursalesSchema = SchemaFactory.createForClass(Sucursales);