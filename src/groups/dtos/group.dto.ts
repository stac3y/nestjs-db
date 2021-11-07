import { Field, ObjectType } from '@nestjs/graphql'

import { LevelEntity } from '../../levels/entities/level.entity'

@ObjectType('Group')
export class GroupDTO {
    @Field(() => String)
    name: string

    @Field(() => String)
    shortname: string

    @Field(() => LevelEntity)
    level: LevelEntity
}
