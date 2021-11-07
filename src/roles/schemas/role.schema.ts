import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RoleDocument = Role & Document
export const ROLE_COLLECTION_NAME = 'roles'
@Schema({ collection: ROLE_COLLECTION_NAME, timestamps: false })
export class Role {

    _id: string

    @Prop({ required: true })
    name: string
}

export const RoleSchema = SchemaFactory.createForClass(Role)
