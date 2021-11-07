import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'

import { config } from './config/config'
import { mongooseConfig } from './config/mongoose.config'
import { GroupsModule } from './groups/groups.module'
import { JokesModule } from './jokes/jokes.module'
import { LevelsModule } from './levels/levels.module'
import { RolesModule } from './roles/roles.module'
import { StatusesModule } from './statuses/stasuses.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            playground: true,
            introspection: true,
        }),
        MongooseModule.forRootAsync(mongooseConfig),
        GroupsModule,
        JokesModule,
        LevelsModule,
        RolesModule,
        StatusesModule,
        UsersModule
    ],
})
export class AppModule {}
