import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true }) 
  phone: string;

  @Prop()
  email?: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
