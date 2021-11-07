import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateEntitiesInput } from './graphql/inputs/create-entities.input'
import { CreateEntitiesType } from './graphql/types/create-entities.type'
import { ResultType } from './graphql/types/entities.type'
import { UsersService } from './users.service'

@Resolver(() => String)
export class UsersResolver {
    constructor(private readonly _usersService: UsersService) {}

    @Query(() => String, {
        description: 'Returns pong',
    })
    async ping(): Promise<string> {
        return 'pong'
    }

    @Mutation(() => CreateEntitiesType)
    async createEntities(
        @Args('input') input: CreateEntitiesInput,
    ): Promise<CreateEntitiesType> {
        const { amount } = input
        const promises = []

        for (let i = 0; i < amount; i += 1) {
            promises.push(this._usersService.createEntities())
        }

        Promise.all(promises)

        const response = { message: 'Entities created successfuly!' }

        return response
    }

    @Query(() => ResultType)
    async getEntities(
        @Args('input') input: CreateEntitiesInput,
    ): Promise<ResultType> {
        const { amount } = input
        const response = await this._usersService.getEntities(amount)
        return response
    }
}
