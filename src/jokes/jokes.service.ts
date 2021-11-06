import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { JokeDTO } from './dtos/joke.dto'
import { JokeEntity } from './entities/joke.entity'

@Injectable()
export class JokesService {
    private _logger = new Logger(JokesService.name)

    constructor(
        @InjectRepository(JokeEntity)
        private readonly _jokesRepository: Repository<JokeEntity>,
    ) {}

    async createJoke(input: JokeDTO): Promise<JokeEntity> {
        try {
            const { name, text, rate, like, view, user } = input

            const joke = this._jokesRepository.create({
                name,
                text,
                rate,
                like,
                view,
                user,
            })

            return await this._jokesRepository.save(joke)
        } catch (error) {
            this._logger.error(error, 'createJoke method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getJokeByUserId(userId: string): Promise<JokeEntity> {
        try {
            const joke = await this._jokesRepository.findOne({
                where: {
                    user: userId,
                },
            })

            if (!joke) {
                throw new NotFoundException(
                    `Joke with this userId: ${userId} not found`,
                )
            }

            return joke
        } catch (error) {
            this._logger.error(error, 'getJokeByUserId method error')

            if (error instanceof NotFoundException) {
                throw error
            }

            throw new InternalServerErrorException(error)
        }
    }
}
