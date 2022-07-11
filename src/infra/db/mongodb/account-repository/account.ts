import { AddAccountRepository } from '@/data/protocols/addAccountRepository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getColletion('accounts')
    const result = await accountCollection.insertOne(accountData)
    const foundedAccount = await accountCollection.findOne({ _id: result.insertedId })
    const { _id, ...accountWithoutId } = foundedAccount
    const account = Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as AccountModel
    return account
  }
}
