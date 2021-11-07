import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Status')
export class StatusDTO {
    @Field(() => String)
    name: string
}
