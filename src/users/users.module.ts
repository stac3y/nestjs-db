import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { GroupsModule } from '../groups/groups.module'
import { JokesModule } from '../jokes/jokes.module'
import { LevelsModule } from '../levels/levels.module'
import { RolesModule } from '../roles/roles.module'
import { StatusesModule } from '../statuses/stasuses.module'

import { User, UserSchema } from './schemas/user.schema'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        GroupsModule,
        JokesModule,
        LevelsModule,
        RolesModule,
        StatusesModule,
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
