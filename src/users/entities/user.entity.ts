import { Entity, Column, ManyToOne } from 'typeorm'

import { RoleEntity } from '../../roles/entities/role.entity'
import { StatusEntity } from '../../statuses/entities/status.entity'

import { CommonBaseEntity } from './common-base-entity.entity'

export const USER_TABLE_NAME = 'users'
@Entity(USER_TABLE_NAME)
export class UserEntity extends CommonBaseEntity {
    @Column({ type: String })
    name: string

    @Column({ type: String })
    surname: string

    @Column({ type: String })
    login: string

    @Column({ type: String })
    password: string

    @ManyToOne(() => RoleEntity, (role) => role.id, { nullable: true })
    role: RoleEntity

    @ManyToOne(() => StatusEntity, (status) => status.id)
    status: StatusEntity
}
