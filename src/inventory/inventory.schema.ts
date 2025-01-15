import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class InventoryItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  unit: string;

  @Prop()
  minimumQuantity: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'InventoryTemplate' })
  template: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MenuItem' })
  menuItem: MongooseSchema.Types.ObjectId;
}

@Schema()
export class Inventory {
  @Prop({ required: true })
  branchId: string;

  @Prop({ required: true })
  date: Date;

  @Prop([InventoryItem])
  items: InventoryItem[];
}

export type InventoryDocument = Inventory & Document;
export const InventorySchema = SchemaFactory.createForClass(Inventory);

InventorySchema.statics.findByIdAndRemove = function (id: string) {
  return this.findByIdAndDelete(id);
};