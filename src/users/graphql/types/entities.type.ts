import { Field, ObjectType } from '@nestjs/graphql'

import { GroupDTO } from '../../../groups/dtos/group.dto'
import { JokeDTO } from '../../../jokes/dtos/joke.dto'
import { LevelDTO } from '../../../levels/dtos/level.dto'
import { RoleDTO } from '../../../roles/dtos/role.dto'
import { StatusDTO } from '../../../statuses/dtos/status.dto'
import { UserDTO } from '../../dtos/user.dto'

@ObjectType('Entities')
export class EntitiesType {
    @Field()
    group: GroupDTO

    @Field()
    joke: JokeDTO

    @Field()
    level: LevelDTO

    @Field()
    role: RoleDTO

    @Field()
    status: StatusDTO

    @Field()
    user: UserDTO
}
