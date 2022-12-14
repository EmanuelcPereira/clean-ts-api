import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import {
  AddSurveyModel,
  AddSurveyRepository,
} from '@/data/usecases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
