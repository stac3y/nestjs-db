import { Entity, Column, ManyToOne } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'
import { RoleEntity } from './role.entity'
import { StatusEntity } from './status.entity'

export const USER_TABLE_NAME = 'user'
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
