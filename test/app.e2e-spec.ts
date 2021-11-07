import { performance } from 'perf_hooks'

import { INestApplication, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'

import { typeOrmConfig } from 'src/config/typeorm.config'
import { UsersModule } from 'src/users/users.module'

import { config } from '../src/config/config'

const TIMEOUT = 10000

describe('AppController (e2e)', () => {
    let app: INestApplication
    jest.setTimeout(TIMEOUT)
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(config),
                TypeOrmModule.forRootAsync(typeOrmConfig),
                GraphQLModule.forRoot({
                    installSubscriptionHandlers: true,
                    autoSchemaFile: 'schema.gql',
                    playground: true,
                    introspection: true,
                }),
                UsersModule,
            ],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })
    describe('PostgreSQl Test (e2e)', () => {
        it('writing', async () => {
            const configService = app.get(ConfigService)
            const AMOUNT = configService.get('AMOUNT')
            const begin = performance.now()
            const response = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: `mutation createEntities {
                        createEntities(input: { amount: ${AMOUNT} }) {
                          message
                        }
                      }`,
                })
            const end = performance.now()
            const time = end - begin
            Logger.log(response.body)
            Logger.log(`Time for writing: ${time} ms`)
            return response
        })

        it('reading', async () => {
            const configService = app.get(ConfigService)
            const AMOUNT = configService.get('AMOUNT')
            const begin = performance.now()
            const response = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: `query getEntities {
                        getEntities(input: { amount: ${AMOUNT} }) {
                          result {
                            user {
                              name
                              surname
                              login
                              password
                            }
                            status {
                              name
                            }
                            role {
                              name
                            }
                            group {
                              name
                              shortname
                            }
                            joke {
                              name
                              text
                              rate
                              view
                              like
                            }
                            level {
                              name
                            }
                          }
                        }
                      }`,
                })
                .set('Accept', 'application/json')
            const end = performance.now()
            const time = end - begin
            Logger.log(response.body)
            Logger.log(`Time for reading: ${time} ms`)
            return expect(response).not.toBeUndefined()
        })
    })
})
