import { Request, Response } from 'express'

import Customer from '#root/db/models/Customer'
import Movie from '#root/db/models/Movie'
import joiValidation from './validation'

export const validateRental = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { error } = joiValidation(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(400).send('Invalid customer.')

  const movie = await Movie.findById(req.body.customerId)
  if (!movie) return res.status(400).send('Invalid movie.')

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.')

  req.body.customer = customer
  req.body.movie = movie

  return next()
}

export const buildRentalObjectToPost = (
  req: Request,
  _: Response,
  next: any
) => {
  const { customer, movie } = req.body

  const rental = {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  }

  req.body.rental = rental

  next()
}
