import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleEntity } from './schemas/role.schema'
import { RolesService } from './roles.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([RoleEntity]),
    ],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
