import { CompareFieldsValidation } from '@/presentation/helpers/validator/compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'invalid_field',
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'any_field',
    })

    expect(error).toBeFalsy()
  })
})
