import express from 'express'

import customer from './customer'
import genre from './genre'
import movie from './movie'
import rental from './rental'

const router = express.Router()

router.use('/customer', customer)
router.use('/genre', genre)
router.use('/movie', movie)
router.use('/rental', rental)

export default router
