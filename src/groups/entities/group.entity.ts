import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { LevelEntity } from '../../levels/entities/level.entity'

export const GROUP_TABLE_NAME = 'groups'
@Entity(GROUP_TABLE_NAME)
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @Column({ type: String })
    shortname: string

    @OneToOne(() => LevelEntity, (level) => level.id)
    @JoinColumn()
    level: LevelEntity
}
