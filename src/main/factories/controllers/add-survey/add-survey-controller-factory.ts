import { Controller } from '@/presentation/protocolos'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDBAddSurvey } from '@/main/factories/usecases/add-survey/db-add-survey-factory'

export const makeSurveyController = (): Controller => {
  return makeLogControllerDecorator(
    new AddSurveyController(makeAddSurveyValidation(), makeDBAddSurvey()),
  )
}
