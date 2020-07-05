import express from 'express'

import customer from './customer'
import genre from './genre'
import auth from './auth'
import movie from './movie'
import rental from './rental'
import user from './user'

const router = express.Router()

router.use('/customer', customer)
router.use('/genre', genre)
router.use('/auth', auth)
router.use('/movie', movie)
router.use('/rental', rental)
router.use('/user', user)

export default router
