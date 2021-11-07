import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Group')
export class GroupDTO {
    @Field(() => String)
    name: string

    @Field(() => String)
    shortname: string
}
