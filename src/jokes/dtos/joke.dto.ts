import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Joke')
export class JokeDTO {
    @Field(() => String)
    name: string

    @Field(() => String)
    text: string

    @Field(() => Number)
    rate: number

    @Field(() => Number)
    like: number

    @Field(() => Number)
    view: number
}
