import mongoose from 'mongoose'
import config from 'config'

import { dbDebugger as log } from '../utils/debuggers'

const mongooseConfig = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

const dbUrl: string = config.get('db.url')

mongoose
  .connect(dbUrl, mongooseConfig)
  .then(() => log(`Connected to MongoDB on ${dbUrl}`))
  .catch((error) => log('Could not connect to MongoDB', error))
