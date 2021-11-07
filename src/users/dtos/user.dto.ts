import { Field, ObjectType } from '@nestjs/graphql'

import {RoleEntity } from '../../roles/entities/role.entity'
import {StatusEntity } from '../../statuses/entities/status.entity'

@ObjectType('User')
export class UserDTO {
    @Field(() => String)
    name: string

    @Field(() => String)
    surname: string

    @Field(() => String)
    login: string

    @Field(() => String)
    password: string

    @Field(() => RoleEntity)
    role: RoleEntity

    @Field(() => StatusEntity)
    status: StatusEntity
}
