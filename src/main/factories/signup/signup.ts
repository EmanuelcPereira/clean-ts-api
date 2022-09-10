import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocolos'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongi-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
