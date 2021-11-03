import { Entity, Column } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('jokes')
export class JokeEntity extends CommonBaseEntity {
    @Column()
    name: string

    @Column()
    text: string
    
    @Column()
    rate: number

    @Column()
    like: number

    @Column()
    view: number
}
