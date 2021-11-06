import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GroupDTO } from './dtos/group.dto'
import { GroupEntity } from './entities/group.entity'

@Injectable()
export class GroupsService {
    private _logger = new Logger(GroupsService.name)

    constructor(
        @InjectRepository(GroupEntity)
        private readonly _groupsRepository: Repository<GroupEntity>,
    ) {}

    async createGroup(input: GroupDTO): Promise<GroupEntity> {
        try {
            const { name, shortname } = input

            const group = this._groupsRepository.create({
                name,
                shortname,
            })

            return await this._groupsRepository.save(group)
        } catch (error) {
            this._logger.error(error, 'createGroup method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getGroupById(id: string): Promise<GroupEntity> {
        try {
            const group = await this._groupsRepository.findOne({
                where: {
                    id,
                },
            })

            if (!group) {
                throw new NotFoundException(
                    `Group with this id: ${id} not found`,
                )
            }

            return group
        } catch (error) {
            this._logger.error(error, 'getGroupById method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
