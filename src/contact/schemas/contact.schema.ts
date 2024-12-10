import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true}) 
  phone: string;

  @Prop()
  email?: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  user: User
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
