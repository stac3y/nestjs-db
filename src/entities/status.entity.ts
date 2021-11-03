import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('statuses')
export class StatusEntity extends CommonBaseEntity {
    @Column()
    name: string
}
