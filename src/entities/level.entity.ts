import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('levels')
export class LevelEntity extends CommonBaseEntity {
    @Column()
    name: string
}
