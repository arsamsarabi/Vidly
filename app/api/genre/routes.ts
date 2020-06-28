import express from 'express'

import validateGenre from './validation'
import controller from './controller'
import parseError from './errorHandler'

const router = express.Router()

router.get('/', async (req, res) => {
  const genres = await controller.getAllGenres()
  res.send(genres)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const genre = await controller.getGenreById(id)

  if (!genre)
    return res.status(404).send(`Could not find a genre with the ID ${id}`)

  return res.send(genre)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const newGenre = { name }

  const { error } = validateGenre(newGenre)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  try {
    const result = await controller.createGenre(newGenre)
    return res.status(200).send(`Genre ${result.name} added!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  const newGenre = { name }

  const { error } = validateGenre(newGenre)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  try {
    const result = await controller.updateGenre(id, newGenre)
    return res.status(200).send(`Genre ${result?.name} updated!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.delete('/:id', async (req, res) => {
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
