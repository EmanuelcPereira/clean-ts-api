import { AddSurvey } from '@/domain/usecases/add-survey'
import {
  serverError,
  noContent,
  badRequest,
} from '@/presentation/helpers/http/httpHelper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReqest.body)

      if (error) return badRequest(error)

      const { question, answers } = httpReqest.body
      await this.addSurvey.add({ question, answers })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
