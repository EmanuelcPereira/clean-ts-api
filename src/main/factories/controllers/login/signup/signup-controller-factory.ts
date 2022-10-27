import { makeDBAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocolos'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDBAddAccount(),
      makeSignUpValidation(),
      makeDbAuthentication(),
    ),
  )
}
