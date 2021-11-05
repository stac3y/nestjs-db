import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JokeEntity } from './entities/joke.entity'
import { JokesService } from './jokes.service'

@Module({
    imports: [
        HttpModule,
        ConfigService,
        TypeOrmModule.forFeature([JokeEntity]),
    ],
    providers: [JokesService],
    exports: [JokesService],
})
export class JokesModule {}
