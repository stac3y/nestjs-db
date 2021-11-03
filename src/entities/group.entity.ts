import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('groups')
export class GroupEntity extends CommonBaseEntity {
    @Column()
    name: string

    @Column()
    shortname: string
}
