import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('users')
export class UserEntity extends CommonBaseEntity {
    @Column()
    name: string

    @Column()
    surname: string
    
    @Column()
    login: string

    @Column()
    password: string
}
