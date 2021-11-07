import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { GroupDTO } from './dtos/group.dto'
import { Group, GroupDocument } from './schemas/group.schema'

@Injectable()
export class GroupsService {
    private _logger = new Logger(GroupsService.name)

    constructor(
        @InjectModel(Group.name) private _groupModel: Model<GroupDocument>,
    ) {}

    async createGroup(input: GroupDTO): Promise<Group> {
        const group = new this._groupModel(input)
        return await group.save()
    }

    async getGroupById(id: string): Promise<Group> {
        try {
            const group = await this._groupModel.findById(id)

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
