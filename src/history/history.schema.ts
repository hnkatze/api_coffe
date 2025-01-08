import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
export class History {

@Prop({ default: false })
casier: string

@Prop({ type: [{ name: String, price: Number, quantity: Number }] })
items: { name: string; price: number; quantity: number }[];

@Prop()
status: string;

@Prop()
table: string;

@Prop()
timestamp: string;

@Prop()
total: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);