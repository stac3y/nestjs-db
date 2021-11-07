import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { JokeDTO } from './dtos/joke.dto'
import { Joke, JokeDocument } from './schemas/joke.schema'

const {ObjectId} = Types

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

    async getJokeByUserId(userId: string): Promise<Joke> {
        try {
            ObjectId(userId)
            
            const joke = await this._jokeModel.findOne()

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
