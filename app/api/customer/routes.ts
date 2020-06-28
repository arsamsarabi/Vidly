import express from 'express'

import validateCustomer from './validation'
import controller from './controller'
import parseError from './errorHandler'

const router = express.Router()

router.get('/', async (req, res) => {
  const customers = await controller.getAllCustomers()
  res.send(customers)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const customer = await controller.getCustomerById(id)

  if (!customer)
    return res.status(404).send(`Could not find a customer with the ID ${id}`)

  return res.send(customer)
})

router.post('/', async (req, res) => {
  const { name, phone, isGold } = req.body
  const newCustomer = { name, phone, isGold }

  const { error } = validateCustomer(newCustomer)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  try {
    const result = await controller.createCustomer(newCustomer)
    return res.status(200).send(`Customer ${result.name} added!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, phone, isGold } = req.body
  const newCustomer = { name, phone, isGold }

  const { error } = validateCustomer(newCustomer)
  if (error) return res.status(400).send(error.details.map((e) => e.message))

  try {
    const result = await controller.updateCustomer(id, newCustomer)
    return res.status(200).send(`Customer ${result?.name} updated!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await controller.deleteCustomer(id)
    return res.status(200).send(`Customer ${result?.name} deleted!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

export default router
