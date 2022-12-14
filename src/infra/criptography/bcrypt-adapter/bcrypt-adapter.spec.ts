import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash')
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true)
  },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')

      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('should return a valid hash on success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')

      expect(hash).toBe('hash')
    })

    test('should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.hash('any_value')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('', () => {
    test('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')

      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('should return true on succeeds', async () => {
      const sut = makeSut()
      const compare = await sut.compare('any_value', 'any_hash')

      expect(compare).toBeTruthy()
    })

    test('should return false with fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const compare = await sut.compare('any_value', 'any_hash')

      expect(compare).toBe(false)
    })

    test('should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_hash')

      await expect(promise).rejects.toThrow()
    })
  })
})
