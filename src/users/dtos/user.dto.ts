import {RoleEntity } from '../../roles/entities/role.entity'
import {StatusEntity } from '../../statuses/entities/status.entity'

export interface UserDTO {
    name: string
    surname: string
    login: string
    password: string
    role: RoleEntity
    status: StatusEntity
}