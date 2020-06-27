import express from 'express'
import Joi from '@hapi/joi'

import { Person } from './types'

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

app.get('/api/person/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id))
  if (!person) res.status(404).send('Person not found!')
  res.send(person)
})

app.post('/api/people', (req, res) => {
  const { name } = req.body

  const person = {
    id: people.length + 1,
    name,
  }

  const { error } = validatePerson(person)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  people.push(person)

  return res.status(200).send(`Person ${person.id} added!`)
})

app.put('/api/person/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((p) => p.id === parseInt(id))
  if (!person) return res.status(400).send('Person not found!')

  const newPerson = {
    id: person.id,
    name,
  }

  const { error } = validatePerson(newPerson)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  person.name = newPerson.name

  return res.status(200).send(newPerson)
})

app.delete('/api/person/:id', (req, res) => {
  const { id } = req.params
  const person = people.find((p) => p.id === parseInt(id))
  if (!person) return res.status(400).send('Person not found!')

  const index = people.indexOf(person)
  people.splice(index, 1)

  return res.status(200).send(person)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`)
})

const validatePerson = (person: Person) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  })
  const { error, value } = schema.validate(person)
  return { error, value }
}
