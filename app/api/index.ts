import express from 'express'

import genres from './genres'

const router = express.Router()

router.use('/genre', genres)

export default router
