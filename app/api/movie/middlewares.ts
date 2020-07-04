import * as express from 'express'

import Genre from '#root/db/models/Genre'
import joiValidation from './validation'

export const validateMovie = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const { error } = joiValidation(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))
  return next()
}

export const transformGenres = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  let genres = []

  try {
    genres = await Genre.find({
      _id: { $in: req.body.genreIds },
    })
      .select('_id name')
      .sort('name')

    if (!genres || genres.length !== req.body.genreIds.length)
      return res.status(400).send('Invalid genre')
  } catch (error) {
    return res.status(400).send('Invalid genre')
  }

  req.body.genres = genres
  return next()
}

export const buildMovieObjectToPost = (
  req: express.Request,
  _: express.Response,
  next: any
) => {
  const movie = {
    title: req.body.title,
    genre: req.body.genres,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  }
  req.body.movie = movie
  next()
}
