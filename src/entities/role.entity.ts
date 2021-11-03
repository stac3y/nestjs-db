import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('roles')
export class RoleEntity extends CommonBaseEntity {
    @Column()
    name: string
}
