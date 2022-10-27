import { AddAccountRepository } from '@/data/protocols/db/account/addAccountRepository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/loadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/updateAccessTokenRepository'
import {
  AccountModel,
  AddAccountModel,
} from '@/data/usecases/add-account/db-add-accout-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/loadAccountByTokenRepository'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
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

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const account = await accountCollection.findOne({ accessToken: token, role })

    return account && MongoHelper.map(account)
  }
}
