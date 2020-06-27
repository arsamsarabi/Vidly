import express from 'express'
import Joi from '@hapi/joi'
import helmet from 'helmet'
import morgan from 'morgan'
import config from 'config'

import auth from './middlewares/auth'
import logger from './middlewares/logger'
import { appDebugger as log } from './utils/debuggers'

const { NODE_ENV = 'development' } = process.env
const port: number = config.get('port')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views') // default path

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
if (NODE_ENV === 'development') {
  log('Morgan enabled...')
  app.use(morgan('combined'))
}
app.use(auth)
app.use(logger)

// Configuration
log(`Application name: ${config.get('name')}`)
log(`Mail Server: ${config.get('mail.host')}`)
log(`Mail password: ${config.get('mail.password')}`)

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
  res.render('index', { title: 'Vidly', message: 'Hello World!' })
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`)
})

const validateGenre = (genre: Genre) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  })
  const { error, value } = schema.validate(genre)
  return { error, value }
}
