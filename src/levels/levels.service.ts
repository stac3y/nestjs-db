import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { LevelDTO } from './dtos/level.dto'
import { LevelEntity } from './entities/level.entity'

@Injectable()
export class LevelsService {
    private _logger = new Logger(LevelsService.name)

    constructor(
        @InjectRepository(LevelEntity)
        private readonly _levelsRepository: Repository<LevelEntity>,
    ) {}

    async createLevel(input: LevelDTO): Promise<LevelEntity> {
        try {
            const { name } = input

            const level = this._levelsRepository.create({
                name,
            })

            return await this._levelsRepository.save(level)
        } catch (error) {
            this._logger.error(error, 'createLevel method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getLevelById(id: string): Promise<LevelEntity> {
        try {
            const level = await this._levelsRepository.findOne({
                where: {
                    id,
                },
            })

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
