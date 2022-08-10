import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    app.post('/api/signup', (req, res) => res.send())
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Emanuel Pereira',
        email: 'emanuelcdpr@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
