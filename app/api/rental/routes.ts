import express, { Request, Response } from 'express'

import { apiDebugger as log } from '#root/utils/debuggers'
import controller from './controller'
import { validateRental, buildRentalObjectToPost } from './middlewares'

const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  const rentals = await controller.getAllRentals()
  res.send(rentals)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const rental = await controller.getRentalById(id)

  if (!rental)
    return res.status(404).send(`Could not find a rental with the ID ${id}`)

  return res.send(rental)
})

router.post(
  '/',
  [validateRental, buildRentalObjectToPost],
  async (req: Request, res: Response) => {
    try {
      await controller.createRental(req.body.rental)
      return res.status(200).send('Rental added!')
    } catch (error) {
      log(error.message)
      return res.status(500).send('Unknown error')
    }
  }
)

// router.put(
//   '/:id',
//   [validateRental, transformGenres, buildRentalObjectToPost],
//   async (req: Request, res: Response) => {
//     const id = req.params.id

//     try {
//       const result = await controller.updateRental(id, req.body.movie)
//       return res.status(200).send(`Rental ${result?.title} updated!`)
//     } catch (error) {
//       console.error(error)
//       return res.status(500).send('Unknown error')
//     }
//   }
// )

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    await controller.deleteRental(id)
    return res.status(200).send('Rental deleted!')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Unknown error')
  }
})

export default router
