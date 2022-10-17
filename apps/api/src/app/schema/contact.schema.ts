import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Contact {
   @Prop()
   name: string;
   @Prop()
   address: string;
   @Prop()
   phone: string;
   @Prop()
   email: string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);