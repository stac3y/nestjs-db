import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RoleDTO } from './dtos/role.dto'
import { RoleEntity } from './entities/role.entity'

@Injectable()
export class RolesService {
    private _logger = new Logger(RolesService.name)

    constructor(
        @InjectRepository(RoleEntity)
        private readonly _rolesRepository: Repository<RoleEntity>,
    ) {}

    async createRole(input: RoleDTO): Promise<RoleEntity> {
        try {
            const { name } = input

            const role = this._rolesRepository.create({
                name,
            })

            return await this._rolesRepository.save(role)
        } catch (error) {
            this._logger.error(error, 'createRole method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getRoleById(id: string): Promise<RoleEntity> {
        try {
            const role = await this._rolesRepository.findOne({
                where: {
                    id
                },
            })

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
