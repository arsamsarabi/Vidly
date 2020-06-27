import express from 'express'

const app = express()
const { PORT = 4200 }: { PORT?: number } = process.env

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World!' }))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`)
})
