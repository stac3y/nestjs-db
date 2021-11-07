import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { StatusDTO } from './dtos/status.dto'
import { Status, StatusDocument } from './schemas/status.schema'

@Injectable()
export class StatusesService {
    private _logger = new Logger(StatusesService.name)

    constructor(
        @InjectModel(Status.name) private _statusModel: Model<StatusDocument>,
    ) {}
    async createStatus(input: StatusDTO): Promise<Status> {
        try {
            const status = new this._statusModel(input)

            return await status.save()
        } catch (error) {
            this._logger.error(error, 'createStatus method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getStatusById(id: string): Promise<Status> {
        try {
            const status = await this._statusModel.findById(id)

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
