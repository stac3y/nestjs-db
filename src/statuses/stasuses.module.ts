import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { StatusEntity } from './entities/status.entity'
import { StatusesService } from './stasuses.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([StatusEntity]),
    ],
    providers: [StatusesService],
    exports: [StatusesService],
})
export class StatusesModule {}
