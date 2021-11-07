import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { JokeDTO } from './dtos/joke.dto'
import { Joke, JokeDocument } from './schemas/joke.schema'

@Injectable()
export class JokesService {
    private _logger = new Logger(JokesService.name)

    constructor(
        @InjectModel(Joke.name) private _jokeModel: Model<JokeDocument>,
    ) {}

    async createJoke(input: JokeDTO): Promise<Joke> {
        try {
            const joke = new this._jokeModel(input)

            return await joke.save()
        } catch (error) {
            this._logger.error(error, 'createJoke method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getJokeById(id: string): Promise<Joke> {
        try {
            const joke = await this._jokeModel.findById(id)

            if (!joke) {
                throw new NotFoundException(
                    `Joke with this id: ${id} not found`,
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
