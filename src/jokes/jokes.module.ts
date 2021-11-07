import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { JokesService } from "./jokes.service"
import { Joke, JokeSchema } from "./schemas/joke.schema"

@Module({
  imports: [MongooseModule.forFeature([
    {name: Joke.name, schema: JokeSchema}
  ])],
  providers: [JokesService],
  exports: [JokesService],
})
export class JokesModule {}
