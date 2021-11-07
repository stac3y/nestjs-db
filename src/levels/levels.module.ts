import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { LevelsService } from "./levels.service"
import { Level, LevelSchema } from "./schemas/level.schema"

@Module({
  imports: [MongooseModule.forFeature([
    {name: Level.name, schema: LevelSchema}
  ])],
  providers: [LevelsService],
  exports: [LevelsService],
})
export class LevelsModule {}
