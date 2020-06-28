import express from 'express'

import genre from './genre'

const router = express.Router()

router.use('/genre', genre)

export default router
