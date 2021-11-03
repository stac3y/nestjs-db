import { Entity } from 'typeorm'

import { CommonBaseEntity } from './common-base-entity.entity'

@Entity('users-in-groups')
export class UserInGroupEntity extends CommonBaseEntity {

}
