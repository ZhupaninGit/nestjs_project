import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

@Schema({
    timestamps: true
})
export class User extends Document{
    @Prop({unique:[true, "The user with same email already exists."]})
    email: String

    @Prop()
    password: String
}

export const UserSchema = SchemaFactory.createForClass(User)