import express, { Request, Response } from 'express'

import { apiDebugger as log } from '#root/utils/debuggers'
import controller from './controller'
import {
  transformGenres,
  validateMovie,
  buildMovieObjectToPost,
} from './middlewares'

const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  const movies = await controller.getAllMovies()
  res.send(movies)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const movie = await controller.getMovieById(id)

  if (!movie)
    return res.status(404).send(`Could not find a movie with the ID ${id}`)

  return res.send(movie)
})

router.post(
  '/',
  [validateMovie, transformGenres, buildMovieObjectToPost],
  async (req: Request, res: Response) => {
    try {
      const result = await controller.createMovie(req.body.movie)
      return res.status(200).send(`Movie ${result.title} added!`)
    } catch (error) {
      log(error.message)
      return res.status(500).send('Unknown error')
    }
  }
)

router.put(
  '/:id',
  [validateMovie, transformGenres, buildMovieObjectToPost],
  async (req: Request, res: Response) => {
    const id = req.params.id

    try {
      const result = await controller.updateMovie(id, req.body.movie)
      return res.status(200).send(`Movie ${result?.title} updated!`)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Unknown error')
    }
  }
)

router.delete('/:id', async (req: Request, res: Response) => {
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
