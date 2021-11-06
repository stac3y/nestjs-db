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
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @DeleteDateColumn({ type: 'timestamp with time zone' })
    deletedAt?: Date

    get isDeleted(): boolean {
        return this.deletedAt != null
    }
}
