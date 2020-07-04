import express, { Request, Response } from 'express'

import controller from './controller'
import parseError from './errorHandler'
import { validateCustomer } from './middlewares'

const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  const customers = await controller.getAllCustomers()
  res.send(customers)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const customer = await controller.getCustomerById(id)

  if (!customer)
    return res.status(404).send(`Could not find a customer with the ID ${id}`)

  return res.send(customer)
})

router.post('/', validateCustomer, async (req: Request, res: Response) => {
  try {
    const result = await controller.createCustomer(req.body)
    return res.status(200).send(`Customer ${result.name} added!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.put('/:id', validateCustomer, async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await controller.updateCustomer(id, req.body)
    return res.status(200).send(`Customer ${result?.name} updated!`)
  } catch (error) {
    const { code, message } = parseError(error)
    return res.status(code).send(message)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
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
