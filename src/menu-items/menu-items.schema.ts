import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Portion {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;
}

@Schema()
export class MenuItem {
    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    item: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: MongooseSchema.Types.Mixed }] })
    portions?: Portion[];

    @Prop()
    price?: number;
}

export type MenuItemDocument = MenuItem & Document;
export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
