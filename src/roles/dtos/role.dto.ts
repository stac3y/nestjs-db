import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Role')
export class RoleDTO {
    @Field(() => String)
    name: string
}
