import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const ROLE_TABLE_NAME = 'roles'
@Entity(ROLE_TABLE_NAME)
@ObjectType()
export class RoleEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column({ type: String })
    name: string
}
