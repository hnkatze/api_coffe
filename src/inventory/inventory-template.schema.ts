import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class PortionDetail {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    unit: string;
}

@Schema()
export class InventoryTemplateItem {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    baseQuantity: number;

    @Prop()
    baseUnit: string;

    @Prop([PortionDetail])
    portions: PortionDetail[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MenuItem' })
    menuItem: MongooseSchema.Types.ObjectId;
}

@Schema()
export class InventoryTemplate {
    @Prop({ required: true })
    name: string;

    @Prop([InventoryTemplateItem])
    items: InventoryTemplateItem[];
}

export type InventoryTemplateDocument = InventoryTemplate & Document;
export const InventoryTemplateSchema = SchemaFactory.createForClass(InventoryTemplate);

InventoryTemplateSchema.statics.findByIdAndRemove = function (id: string) {
  return this.findByIdAndDelete(id);
};