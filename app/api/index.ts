import express from 'express'

import genres from './genres'

const router = express.Router()

router.use('/genres', genres)

export default router
