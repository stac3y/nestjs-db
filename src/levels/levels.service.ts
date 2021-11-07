import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { LevelDTO } from './dtos/level.dto'
import { Level, LevelDocument } from './schemas/level.schema'

@Injectable()
export class LevelsService {
    private _logger = new Logger(LevelsService.name)

    constructor(
        @InjectModel(Level.name) private _levelModel: Model<LevelDocument>,
    ) {}

    async createLevel(input: LevelDTO): Promise<Level> {
        try {
            const level = new this._levelModel(input)

            return await level.save()

        } catch (error) {
            this._logger.error(error, 'createLevel method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getLevelById(id: string): Promise<Level> {
        try {
            const level = await this._levelModel.findById(id)

            if (!level) {
                throw new NotFoundException(
                    `Level with this id: ${id} not found`,
                )
            }

            return level
        } catch (error) {
            this._logger.error(error, 'getLevelById method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
