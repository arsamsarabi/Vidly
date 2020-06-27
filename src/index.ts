import express from 'express'
import Joi from '@hapi/joi'
import helmet from 'helmet'
import morgan from 'morgan'

import auth from './middlewares/auth'
import logger from './middlewares/logger'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('combined'))
app.use(auth)
app.use(logger)

const { PORT = 4200 }: { PORT?: number } = process.env

type Genre = {
  id: number
  name: string
}

const genres: Genre[] = [
  {
    id: 1,
    name: 'Comedy',
  },
  {
    id: 2,
    name: 'Sci-Fi',
  },
  {
    id: 3,
    name: 'Action',
  },
  {
    id: 4,
    name: 'Thriller',
  },
]

app.get('/', (req, res) => {
  res.send('index.html')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genre/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const genre: Genre | undefined = genres.find((g: Genre) => g.id === id)
  if (!genre) res.status(404).send('Genre not found!')
  res.send(genre)
})

app.post('/api/genres', (req, res) => {
  const { name } = req.body

  const genre: Genre = {
    id: genres.length + 1,
    name,
  }

  const { error } = validateGenre(genre)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  genres.push(genre)

  return res.status(200).send(`Genre ${genre.id} added!`)
})

app.put('/api/genre/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  const genre = genres.find((g: Genre) => g.id === id)
  if (!genre) return res.status(400).send('Genre not found!')

  const newGenre = {
    id: genre.id,
    name,
  }

  const { error } = validateGenre(newGenre)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  genre.name = newGenre.name

  return res.status(200).send(newGenre)
})

app.delete('/api/genre/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const genre = genres.find((p) => p.id === id)
  if (!genre) return res.status(400).send('Genre not found!')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  return res.status(200).send(genre)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`)
})

const validateGenre = (genre: Genre) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  })
  const { error, value } = schema.validate(genre)
  return { error, value }
}
