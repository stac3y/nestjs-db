import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import {GroupsModule} from './groups/groups.module'
import {JokesModule} from './jokes/jokes.module'
import {LevelsModule} from './levels/levels.module'
import {RolesModule} from './roles/roles.module'
import {StatusesModule} from './statuses/stasuses.module'
import {UsersModule} from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            playground: true,
            introspection: true,
        }),
        GroupsModule,
        JokesModule,
        LevelsModule,
        RolesModule,
        StatusesModule,
        UsersModule
    ],
})
export class AppModule {}
