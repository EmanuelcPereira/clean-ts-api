import { Router } from 'express'

import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-controller-factory'
import { adaptMIddleware } from '../adapters/express-middleware-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMIddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeSurveyController()))
}
