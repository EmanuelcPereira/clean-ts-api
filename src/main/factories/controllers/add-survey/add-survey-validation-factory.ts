import { Validation } from '@/presentation/protocolos'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validator'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['question', 'answers'])
    validation.push(new RequiredFieldValidation(field))

  return new ValidationComposite(validation)
}
