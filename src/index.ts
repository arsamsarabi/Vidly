import express from 'express'
import Joi from '@hapi/joi'

const app = express()

app.use(express.json())

const { PORT = 4200 }: { PORT?: number } = process.env

const people = [
  {
    id: 1,
    name: 'Arsam',
  },
  {
    id: 2,
    name: 'Dina',
  },
  {
    id: 3,
    name: 'Kush',
  },
  {
    id: 4,
    name: 'Ardi',
  },
]

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World!' }))
})

app.get('/api/people', (req, res) => {
  res.send(people)
})

app.post('/api/people', (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  })

  const person = {
    id: people.length + 1,
    name: req.body.name,
  }

  const { error } = schema.validate(person)

  if (error) return res.status(400).send(error.details.map((e) => e.message))

  people.push(person)

  return res.status(200).send(`Person ${person.id} added!`)
})

app.get('/api/person/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id))
  if (!person) res.status(404).send('Person not found!')
  res.send(person)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`)
})
