import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RoleDTO } from './dtos/role.dto'
import { Role, RoleDocument } from './schemas/role.schema'

@Injectable()
export class RolesService {
    private _logger = new Logger(RolesService.name)

    constructor(
        @InjectModel(Role.name) private _roleModel: Model<RoleDocument>,
    ) {}

    async createRole(input: RoleDTO): Promise<Role> {
        try {
            const role = new this._roleModel(input)

            return await role.save()
        } catch (error) {
            this._logger.error(error, 'createRole method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getRoleById(id: string): Promise<Role> {
        try {
            const role = await this._roleModel.findById(id)

            if (!role) {
                throw new NotFoundException(
                    `Role with this id: ${id} not found`,
                )
            }

            return role
        } catch (error) {
            this._logger.error(error, 'getRoleById method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
