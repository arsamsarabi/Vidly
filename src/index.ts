import express from 'express'

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
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send('Error! Name is required and should be minimum 3 characters')
  }

  const person = {
    id: people.length + 1,
    name: req.body.name,
  }

  people.push(person)

  res.status(200).send(`Person ${person.id} added!`)
})

app.get('/api/person/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id))
  if (!person) res.status(404).send('Person not found!')
  res.send(person)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`)
})
