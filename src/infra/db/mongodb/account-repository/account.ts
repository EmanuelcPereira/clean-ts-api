import { AddAccountRepository } from '@/data/protocols/db/addAccountRepository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/loadAccountByEmailRepository'

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
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
}
