import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const LEVEL_TABLE_NAME = 'levels'
@Entity(LEVEL_TABLE_NAME)
export class LevelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string
}
