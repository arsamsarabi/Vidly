import express from 'express'

import genre from './genre'
import movie from './movie'

const router = express.Router()

router.use('/genre', genre)
router.use('/movie', movie)

export default router
