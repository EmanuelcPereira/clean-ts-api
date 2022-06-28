import validator from 'validator'
import { EmailValidator } from '@/presentation/protocolos/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
