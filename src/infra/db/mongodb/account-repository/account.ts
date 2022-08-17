import { AddAccountRepository } from '@/data/protocols/addAccountRepository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(accountData)
    const foundedAccount = await accountCollection.findOne({
      _id: result.insertedId,
    })

    return MongoHelper.map(foundedAccount)
  }
}
