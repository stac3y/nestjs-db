import { Field, ObjectType } from '@nestjs/graphql'

import { Level } from '../../levels/schemas/level.schema'

@ObjectType('Group')
export class GroupDTO {
    @Field(() => String)
    name: string

    @Field(() => String)
    shortname: string

    @Field(() => Level)
    level: Level
}
