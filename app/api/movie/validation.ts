import Joi from '@hapi/joi'

const schema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  genreIds: Joi.array().items(Joi.string()).required(),
  numberInStock: Joi.number().min(0).max(255).required(),
  dailyRentalRate: Joi.number().min(0).max(255).required(),
})

const joiValidation = (movie: any) => schema.validate(movie)

export default joiValidation
