import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const STATUS_TABLE_NAME = 'statuses'
@Entity(STATUS_TABLE_NAME)
export class StatusEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string
}
