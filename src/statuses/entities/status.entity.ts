import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const STATUS_TABLE_NAME = 'status'
@Entity(STATUS_TABLE_NAME)
export class StatusEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string
}
