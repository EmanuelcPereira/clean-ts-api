import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/presentation/helpers/validator'
import { Validation } from '@/presentation/protocolos'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['email', 'password'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
