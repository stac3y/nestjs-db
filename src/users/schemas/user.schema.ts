import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Group } from '../../groups/schemas/group.schema'
import { Joke } from '../../jokes/schemas/joke.schema'
import { Role } from '../../roles/schemas/role.schema'
import { Status } from '../../statuses/schemas/status.schema'

export type UserDocument = User & Document

export const USER_COLLECTION_NAME = 'users'
@Schema({ collection: USER_COLLECTION_NAME, timestamps: { createdAt: 'createdAt', updatedAt: false }})
export class User {

    _id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    surname: string

    @Prop({ required: true })
    login: string

    @Prop({ required: true })
    password: string

    @Prop({ type: Types.ObjectId, required: false, ref: 'Role' })
    role: Role

    @Prop({ type: Types.ObjectId, required: false, ref: 'Status' })
    status: Status

    @Prop({ type: Types.ObjectId, required: false, ref: 'Group' })
    groups: Group[]

    @Prop({ type: Types.ObjectId, required: false, ref: 'Joke' })
    jokes: Joke[]

    @Prop({ required: false })
    createdAt: number
}

export const UserSchema = SchemaFactory.createForClass(User)

