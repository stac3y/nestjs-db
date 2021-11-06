import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GroupsModule } from '../groups/groups.module'
import {JokesModule} from '../jokes/jokes.module'
import {LevelsModule} from '../levels/levels.module'
import {RolesModule} from '../roles/roles.module'
import {StatusesModule} from '../statuses/stasuses.module'

import { UserInGroup } from './entities/user-in-group.entity'
import { UserEntity } from './entities/user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([UserEntity, UserInGroup]),
        GroupsModule,
        JokesModule,
        LevelsModule,
        RolesModule,
        StatusesModule
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
