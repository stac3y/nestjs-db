import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { GroupsService } from 'src/groups/groups.service'
// import { Group, GroupDocument } from 'src/groups/schemas/group.schema'
import { JokesService } from 'src/jokes/jokes.service'
import { LevelsService } from 'src/levels/levels.service'
import { RolesService } from 'src/roles/roles.service'
import { StatusesService } from 'src/statuses/stasuses.service'

import { UserDTO } from './dtos/user.dto'
import { EntitiesType, ResultType } from './graphql/types/entities.type'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
    private _logger = new Logger(UsersService.name)

    constructor(
        @InjectModel(User.name) private _userModel: Model<UserDocument>,
        private readonly _groupsService: GroupsService,
        private readonly _jokesService: JokesService,
        private readonly _levelsService: LevelsService,
        private readonly _rolesService: RolesService,
        private readonly _statusesService: StatusesService,
    ) {}

    async createUser(input: UserDTO): Promise<User> {
        try {
            
            const user = new this._userModel(input)

            return await user.save()
        } catch (error) {
            this._logger.error(error, 'createUser method error')
            throw new InternalServerErrorException(error)
        }
    }

    /* async addUserToGroup(
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
    } */

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this._userModel.findById(id)

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

    async createEntities(): Promise<void> {
       const level = await this._levelsService.createLevel({
            name: 'high',
        })

        const group = await this._groupsService.createGroup({
            name: 'Group1',
            shortname: '1',
            level,
        })

        const role = await this._rolesService.createRole({
            name: 'user',
        })

        const status = await this._statusesService.createStatus({
            name: 'online',
        })

        let user = await this.createUser({
            name: 'Anastasia',
            surname: 'Starina',
            login: 'stac3y',
            password: 'qwerty',
            role,
            status,
        })

        await this._jokesService.createJoke({
            name: 'Some joke',
            text: 'Some joke text',
            rate: 4,
            like: 100,
            view: 500,
            user,
        })

        await this.addUserToGroup(user, group)

        user = await this.createUser({
            name: 'User',
            surname: 'Surname',
            login: 'user',
            password: '123456',
            role,
            status,
        })

        await this._jokesService.createJoke({
            name: 'Another one joke',
            text: 'Another joke text',
            rate: 5,
            like: 250,
            view: 400,
            user,
        })

        await this.addUserToGroup(user, group)
    }

    async getEntities(amount: number): Promise<ResultType> {
        const users = await this._usersRepository.find({ take: amount })
        if (users.length <= 0) {
            throw new NotFoundException(`Could not find ${amount} users`)
        }
        const promises = []
        for (const user of users) {
            promises.push(this.getEntity(user))
        }
        const response = { result: await Promise.all(promises) }

        return response
    }

    async getEntity(user: UserEntity): Promise<EntitiesType> {
        const joke = await this._jokesService.getJokeByUserId(user.id)
        const status = await this._statusesService.getStatusById(user.statusId)
        const role = await this._rolesService.getRoleById(user.roleId)
        const userInGroup = await this._userInGroupRepository.findOne({
            where: {
                user,
            },
        })
        if (!userInGroup) {
            throw new NotFoundException(`User in group not found`)
        }
        const group = await this._groupsService.getGroupById(
            userInGroup.groupId,
        )
        const level = await this._levelsService.getLevelById(group.levelId)
        const response: EntitiesType = {
            group,
            joke,
            level,
            role,
            status,
            user,
        }

        return response
    }
}
