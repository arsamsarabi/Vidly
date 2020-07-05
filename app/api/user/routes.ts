import express, { Request, Response } from 'express'

import controller from './controller'
import { validateRegistration } from './middlewares'

const router = express.Router()

router.post('/', validateRegistration, async (req: Request, res: Response) => {
  try {
    const user = await controller.registerUser(req.body)
    return res.status(200).send({
      ok: true,
      data: user,
      message: `${user.name} successfully registered.`,
    })
  } catch (error) {
    return res.status(500).send({
      ok: false,
      data: null,
      message: 'Unknown error',
    })
  }
})

export default router
