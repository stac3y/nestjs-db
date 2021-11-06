import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LevelEntity } from './entities/level.entity'
import { LevelsService } from './levels.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([LevelEntity]),
    ],
    providers: [LevelsService],
    exports: [LevelsService],
})
export class LevelsModule {}
