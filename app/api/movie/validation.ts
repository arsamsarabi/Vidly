import Joi from '@hapi/joi'

const validateMovie = (movie: any) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    genreIds: Joi.array().items(Joi.string()).required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  })
  const { error, value } = schema.validate(movie)
  return { error, value }
}

export default validateMovie
