import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from '../../users/schemas/user.schema'

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

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    user: User

}

export const JokeSchema = SchemaFactory.createForClass(Joke)


