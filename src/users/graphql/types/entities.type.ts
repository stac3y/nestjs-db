import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Group')
export class GroupType {
    @Field(() => String)
    name: string

    @Field(() => String)
    shortname: string
}

@ObjectType('Joke')
export class JokeType {
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

@ObjectType('Level')
export class LevelType {
    @Field(() => String)
    name: string
}

@ObjectType('Role')
export class RoleType {
    @Field(() => String)
    name: string
}

@ObjectType('Status')
export class StatusType {
    @Field(() => String)
    name: string
}

@ObjectType('User')
export class UserType {
    @Field(() => String)
    name: string

    @Field(() => String)
    surname: string

    @Field(() => String)
    login: string

    @Field(() => String)
    password: string

}

@ObjectType('Entities')
export class EntitiesType {
    @Field(() => GroupType)
    group: GroupType

    @Field(() => JokeType)
    joke: JokeType

    @Field(() => LevelType)
    level?: LevelType

    @Field(() => RoleType)
    role: RoleType
    
    @Field(() => StatusType)
    status: StatusType

    @Field(() => UserType)
    user: UserType
}

@ObjectType('Result')
export class ResultType {
    @Field(() => [EntitiesType])
    result: EntitiesType[]
}
