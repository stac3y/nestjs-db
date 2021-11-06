import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEntitiesInput {
    @Field()
    amount: number
}
