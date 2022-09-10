import { AddAccountRepository } from '@/data/protocols/db/account/addAccountRepository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/loadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/updateAccessTokenRepository'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(accountData)
    const foundedAccount = await accountCollection.findOne({
      _id: result.insertedId,
    })

    return MongoHelper.map(foundedAccount)
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({ email })

    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const objectId = MongoHelper.parseToObjectId(id)
    await accountCollection.updateOne(
      {
        _id: objectId,
      },
      {
        $set: {
          accessToken: token,
        },
      },
    )
  }
}
