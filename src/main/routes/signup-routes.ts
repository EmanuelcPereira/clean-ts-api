import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.send(200).json({ ok: 'ok' })
  })
}
