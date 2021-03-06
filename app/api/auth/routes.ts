import express, { Request, Response } from 'express'

import controller from './controller'
import { validateLogin } from './middlewares'

const router = express.Router()

router.post('/', validateLogin, async (req: Request, res: Response) => {
  try {
    const user = await controller.loginUser(req.body.email, req.body.password)
    const token = user.generateAuthToken()

    return res.status(200).send({
      ok: true,
      data: token,
      message: 'Successful login!',
    })
  } catch (error) {
    return res.status(500).send({
      ok: false,
      data: null,
      message: error.message,
    })
  }
})

export default router
