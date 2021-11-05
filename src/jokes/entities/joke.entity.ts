import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { UserEntity } from '../../entities/user.entity'

export const JOKE_TABLE_NAME = 'joke'
@Entity(JOKE_TABLE_NAME)
export class JokeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @Column({ type: String })
    text: string

    @Column({ type: Number })
    rate: number

    @Column({ type: Number })
    like: number

    @Column({ type: Number })
    view: number

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity
}
