import express, { Request, Response } from 'express'

import controller from './controller'
import parseError from './errorHandler'
import { validateGenre } from './middlewares'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const genres = await controller.getAllGenres()
  res.send(genres)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const genre = await controller.getGenreById(id)

  if (!genre)
    return res.status(404).send(`Could not find a genre with the ID ${id}`)

  return res.send(genre)
})

router.post('/', validateGenre, async (req: Request, res: Response) => {
  try {
    const result = await controller.createGenre(req.body)
    return res.status(200).send(`Genre ${result.name} added!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.put('/:id', validateGenre, async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await controller.updateGenre(id, req.body)
    return res.status(200).send(`Genre ${result?.name} updated!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const result = await controller.deleteGenre(id)
    return res.status(200).send(`Genre ${result?.name} deleted!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

export default router
