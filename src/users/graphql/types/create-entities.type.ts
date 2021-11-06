import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('CreateEntities')
export class CreateEntitiesType {
    @Field(() => String)
    message: string
}
