import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GroupEntity } from 'src/groups/entities/group.entity'

import { UserDTO } from './dtos/user.dto'
import { UserInGroup } from './entities/user-in-group.entity'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
    private _logger = new Logger(UsersService.name)

    constructor(
        @InjectRepository(UserEntity)
        private readonly _usersRepository: Repository<UserEntity>,
        @InjectRepository(UserInGroup)
        private readonly _userInGroupRepository: Repository<UserInGroup>,
    ) {}

    async createUser(input: UserDTO): Promise<UserEntity> {
        try {
            const { name, surname, login, password, role, status } = input

            const user = this._usersRepository.create({
                name,
                surname,
                login,
                password,
                role,
                status,
            })

            return await this._usersRepository.save(user)
        } catch (error) {
            this._logger.error(error, 'createUser method error')
            throw new InternalServerErrorException(error)
        }
    }

    async addUserToGroup(
        user: UserEntity,
        group: GroupEntity,
    ): Promise<UserInGroup> {
        try {
            const userInGroup = this._userInGroupRepository.create({
                user,
                group,
            })

            return await this._userInGroupRepository.save(userInGroup)
        } catch (error) {
            this._logger.error(error, 'addUserToGroup method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getUserById(id: string): Promise<UserEntity> {
        try {
            const user = await this._usersRepository.findOne({
                where: {
                    id,
                },
            })

            if (!user) {
                throw new NotFoundException(
                    `User with this id: ${id} not found`,
                )
            }

            return user
        } catch (error) {
            this._logger.error(error, 'getUserById method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
