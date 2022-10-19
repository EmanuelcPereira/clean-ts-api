import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validator'
import { Validation } from '@/presentation/protocolos'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['email', 'password'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
