import express from 'express'

import customer from './customer'
import genre from './genre'
import movie from './movie'

const router = express.Router()

router.use('/customer', customer)
router.use('/genre', genre)
router.use('/movie', movie)

export default router
