import express from 'express'
import Joi from '@hapi/joi'

import Genre, { IGenre } from '#root/db/models/Genre'
import { apiDebugger as log } from '#root/utils/debuggers'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find()
    res.send(genres)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const genre = await Genre.findById(id)
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
    const genre = new Genre(newGenre)
    const result: IGenre = await genre.save()
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
    const result = Genre.findOneAndUpdate({ id }, { name }, { new: true })
    log(result)
    return res.status(200).send(`Genre ${result} updated!`)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  try {
    const result = Genre.findByIdAndRemove({ id })
    return res.status(200).send(`Genre ${result} deleted!`)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
})

const validateGenre = (genre: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  })
  const { error, value } = schema.validate(genre)
  return { error, value }
}

export default router
