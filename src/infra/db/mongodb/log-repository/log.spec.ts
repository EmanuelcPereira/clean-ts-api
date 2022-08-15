import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { LogMongoRepository } from './log'

let errorCollection: Collection

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getColletion('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})