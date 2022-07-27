import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.sendStatus(200).json({ ok: 'ok' })
  })
}
