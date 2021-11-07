import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type JokeDocument = Joke & Document

export const JOKE_COLLECTION_NAME = 'jokes'
@Schema({ collection: JOKE_COLLECTION_NAME})
export class Joke {

    _id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    text: string

    @Prop({ required: true })
    rate: number

    @Prop({ required: true })
    like: number

    @Prop({ required: true })
    view: number

}

export const JokeSchema = SchemaFactory.createForClass(Joke)


