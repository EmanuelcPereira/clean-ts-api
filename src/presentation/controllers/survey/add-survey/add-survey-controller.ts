import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpReqest.body)

    return null
  }
}
