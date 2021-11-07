import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Level } from '../../levels/schemas/level.schema'

export type GroupDocument = Group & Document

export const GROUP_COLLECTION_NAME = 'groups'
@Schema({ collection: GROUP_COLLECTION_NAME, timestamps: false})
export class Group {

    _id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    shortname: string

    @Prop({ type: Types.ObjectId, required: false, ref: 'Level' })
    level: Level

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    users: User[]

    @Prop({ required: false })
    createdAt: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)
