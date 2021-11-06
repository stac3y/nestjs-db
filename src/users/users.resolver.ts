import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GroupsService } from '../groups/groups.service'
import { JokesService } from '../jokes/jokes.service'
import { LevelsService } from '../levels/levels.service'
import { RolesService } from '../roles/roles.service'
import { StatusesService } from '../statuses/stasuses.service'

import { CreateEntitiesInput } from './graphql/inputs/create-entities.input'
import { CreateEntitiesType } from './graphql/types/create-entities.type'
// import { EntitiesType } from './graphql/types/entities.type'
import { UsersService } from './users.service'

@Resolver(() => String)
export class UsersResolver {
    constructor(
        private readonly _groupsService: GroupsService,
        private readonly _jokesService: JokesService,
        private readonly _levelsService: LevelsService,
        private readonly _rolesService: RolesService,
        private readonly _statusesService: StatusesService,
        private readonly _usersService: UsersService,
    ) {}

    @Query(() => String, {
        description: 'Returns pong',
    })
    async ping(): Promise<string> {
        return 'pong'
    }

    @Mutation(() => CreateEntitiesInput)
    async createEntities(
        @Args('input') input: CreateEntitiesInput,
    ): Promise<CreateEntitiesType> {
        const { amount } = input
        console.log(amount)
        

        const level = await this._levelsService.createLevel({
            name: 'high',
        })

        const group = await this._groupsService.createGroup({
            name: 'Group1',
            shortname: '1',
            level,
        })

        const role = await this._rolesService.createRole({
            name: 'user',
        })

        const status = await this._statusesService.createStatus({
            name: 'online',
        })

        const user = await this._usersService.createUser({
            name: 'Anastasia',
            surname: 'Starina',
            login: 'stac3y',
            password: 'qwerty',
            role,
            status,
        })

        await this._jokesService.createJoke({
            name: 'Some joke',
            text: 'Some joke text',
            rate: 4.35,
            like: 100,
            view: 500,
            user,
        })

        await this._usersService.addUserToGroup(
            user,
            group,
        )

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
