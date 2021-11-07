import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { Status, StatusSchema } from "./schemas/status.schema"
import { StatusesService } from "./stasuses.service"

@Module({
  imports: [MongooseModule.forFeature([
    {name: Status.name, schema: StatusSchema}
  ])],
  providers: [StatusesService]
})
export class StatusesModule {}
