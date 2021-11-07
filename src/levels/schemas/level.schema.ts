import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type LevelDocument = Level & Document
export const LEVEL_COLLECTION_NAME = 'levels'
@Schema({ collection: LEVEL_COLLECTION_NAME, timestamps: false })
export class Level {

    _id: string

    @Prop({ required: true })
    name: string
}

export const LevelSchema = SchemaFactory.createForClass(Level)
