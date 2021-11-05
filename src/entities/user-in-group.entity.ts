import { Entity, ManyToOne } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'
import { GroupEntity } from './group.entity'
import { UserEntity } from './user.entity'

export const USER_IN_GROUP_TABLE_NAME = 'user_in_group'
@Entity(USER_IN_GROUP_TABLE_NAME)
export class UserInGroupEntity extends CommonBaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @ManyToOne(() => GroupEntity, (group) => group.id)
    group: GroupEntity
}
