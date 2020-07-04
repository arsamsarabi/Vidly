import express from 'express'

import validateMovie from './validation'
import controller from './controller'
import Genre from '#root/db/models/Genre'

const router = express.Router()

router.get('/', async (req, res) => {
  const movies = await controller.getAllMovies()
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const movie = await controller.getMovieById(id)

  if (!movie)
    return res.status(404).send(`Could not find a movie with the ID ${id}`)

  return res.send(movie)
})

router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  let genres = []

  try {
    genres = await Genre.find({
      _id: { $in: req.body.genreIds },
    }).select('_id name')

    if (!genres || genres.length !== req.body.genreIds.length)
      return res.status(400).send('Invalid genre')
  } catch (error) {
    return res.status(400).send('Invalid genre')
  }

  const newMovie = {
    title: req.body.title,
    genre: genres,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  }

  try {
    const result = await controller.createMovie(newMovie)
    return res.status(200).send(`Movie ${result.title} added!`)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Unknown error')
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id

  const { error } = validateMovie(req.body)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  let genres = []

  try {
    genres = await Genre.find({
      _id: { $in: req.body.genreIds },
    }).select('_id name')

    if (!genres || genres.length !== req.body.genreIds.length)
      return res.status(400).send('Invalid genre')
  } catch (error) {
    return res.status(400).send('Invalid genre')
  }

  const movieToUpdate = {
    title: req.body.title,
    genre: genres,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  }

  try {
    const result = await controller.updateMovie(id, movieToUpdate)
    return res.status(200).send(`Movie ${result?.title} updated!`)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Unknown error')
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await controller.deleteMovie(id)
    return res.status(200).send(`Movie ${result?.title} deleted!`)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Unknown error')
  }
})

export default router
