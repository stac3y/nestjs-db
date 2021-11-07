import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Level')
export class LevelDTO {
    @Field(() => String)
    name: string
}
