import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StatusDocument = Status & Document
export const STATUS_COLLECTION_NAME = 'statuses'
@Schema({ collection: STATUS_COLLECTION_NAME, timestamps: false })
export class Status {

    _id: string

    @Prop({ required: true })
    name: string
}

export const StatusSchema = SchemaFactory.createForClass(Status)
