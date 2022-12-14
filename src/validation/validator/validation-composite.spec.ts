import { Validation } from '@/presentation/protocolos'
import { MissingParamError } from '@/presentation/errors'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStubs implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStubs()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs,
  }
}

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())

    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error())
  })

  test('should not return error if validation succeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeFalsy()
  })
})
