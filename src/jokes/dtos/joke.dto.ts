import { UserEntity } from "src/users/entities/user.entity"

export interface JokeDTO {
    name: string
    text: string
    rate: number
    like: number
    view: number
    user: UserEntity
}