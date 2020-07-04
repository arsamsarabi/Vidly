import * as express from 'express'

import joiValidation from './validation'

export const validateGenre = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const { error } = joiValidation(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))
  return next()
}
