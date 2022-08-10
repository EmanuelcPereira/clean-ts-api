import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocolos'
import { LogControllerDecorator } from './log'
describe('LogController', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Emanuel'
          }
        }
        return Promise.resolve(httpResponse)
      }
    }
    const constrollerStub = new ControllerStub()
    const handleSpy = jest.spyOn(constrollerStub, 'handle')
    const sut = new LogControllerDecorator(constrollerStub)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any_mail@mail.com',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
