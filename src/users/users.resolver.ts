import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateEntitiesInput } from './graphql/inputs/create-entities.input'
import { CreateEntitiesType } from './graphql/types/create-entities.type'
// import { EntitiesType } from './graphql/types/entities.type'
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

    /* @Query(() => AuthType)
    async signIn(@Args('input') input: CreateUserInput): Promise<AuthType> {
        const response = await this._authService.signIn(input)

        return response
    }

    @UseGuards(AuthGuard)
    @Mutation(() => String)
    async protectedMethod(): Promise<string> {
        return 'Authorization was successful'
    }

    @Mutation(() => AuthType)
    async refreshToken(
        @Args('refreshToken') refreshToken: string,
        @Args('accessToken') accessToken: string,
    ): Promise<AuthType> {
        return await this._authService.getAccessTokenFromRefreshToken(
            refreshToken,
            accessToken,
        )
    } */
}
