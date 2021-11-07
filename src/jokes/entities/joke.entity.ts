import { ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { UserEntity } from '../../users/entities/user.entity'

export const JOKE_TABLE_NAME = 'jokes'
@Entity(JOKE_TABLE_NAME)
@ObjectType()
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

    @Column({ type: String })
    userId: string
}
