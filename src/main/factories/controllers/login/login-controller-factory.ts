import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { Controller } from '@/presentation/protocolos'

import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLoginValidation()),
  )
}
