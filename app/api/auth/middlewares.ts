import { Request, Response } from 'express'

import joi from './validation'

export const validateLogin = async (req: Request, res: Response, next: any) => {
  const { error } = joi.validateLogin(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  return next()
}
