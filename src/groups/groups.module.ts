import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GroupEntity } from './entities/group.entity'
import { GroupsService } from './groups.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([GroupEntity]),
    ],
    providers: [GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
