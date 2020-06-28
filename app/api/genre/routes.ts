import express from 'express'

import { apiDebugger as log } from '#root/utils/debuggers'
import validateGenre from './validation'
import controller from './controller'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const genres = await controller.getAllGenres()
    res.send(genres)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const genre = await controller.getGenreById(id)
    res.send(genre)
  } catch (error) {
    log(error)
    res.status(500).send(error)
  }
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
    log(error)
    return res.status(500).send(error)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  const newGenre = { name }

  const { error } = validateGenre(newGenre)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  try {
    const result = controller.updateGenre(id, { name })
    return res.status(200).send(`Genre ${result} updated!`)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  try {
    const result = controller.deleteGenre(id)
    return res.status(200).send(`Genre ${result} deleted!`)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
})

export default router
