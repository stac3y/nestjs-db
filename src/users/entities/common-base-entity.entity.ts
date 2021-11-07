import { Field } from '@nestjs/graphql'
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'

/**
 * Has id (auto generated uuidv4), createdAt/deletedAt.
 */
export class CommonBaseEntity {
    /** Auto generated uuid v4 */
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @Field()
    @DeleteDateColumn({ type: 'timestamp with time zone' })
    deletedAt?: Date

    get isDeleted(): boolean {
        return this.deletedAt != null
    }
}
