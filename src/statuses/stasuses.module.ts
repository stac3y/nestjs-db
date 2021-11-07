import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { StatusEntity } from './schemas/status.schema'
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
