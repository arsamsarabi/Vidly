import { Request, Response } from 'express'

import joiValidation from './validation'
import User from '#root/db/models/User'

export const validateRegistration = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { error } = joiValidation(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  const user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('Email already registered.')

  return next()
}
