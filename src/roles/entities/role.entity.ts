import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const ROLE_TABLE_NAME = 'roles'
@Entity(ROLE_TABLE_NAME)
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string
}
