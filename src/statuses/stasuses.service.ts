import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { StatusDTO } from './dtos/status.dto'
import { StatusEntity } from './entities/status.entity'

@Injectable()
export class StatusesService {
    private _logger = new Logger(StatusesService.name)

    constructor(
        @InjectRepository(StatusEntity)
        private readonly _statusesRepository: Repository<StatusEntity>,
    ) {}

    async createStatus(input: StatusDTO): Promise<StatusEntity> {
        try {
            const { name } = input

            const status = this._statusesRepository.create({
                name,
            })

            return await this._statusesRepository.save(status)
        } catch (error) {
            this._logger.error(error, 'createStatus method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getStatusById(id: string): Promise<StatusEntity> {
        try {
            const status = await this._statusesRepository.findOne({
                where: {
                    id,
                },
            })

            if (!status) {
                throw new NotFoundException(
                    `Status with this id: ${id} not found`,
                )
            }

            return status
        } catch (error) {
            this._logger.error(error, 'getStatusById method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
