import { Field, ObjectType } from '@nestjs/graphql'

import { Group } from '../../groups/schemas/group.schema'
import { Role } from '../../roles/schemas/role.schema'
import { Status } from '../../statuses/schemas/status.schema'

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

    @Field(() => Role)
    role: Role

    @Field(() => Status)
    status: Status

    @Field(() => Group)
    groups: Group[]

}
