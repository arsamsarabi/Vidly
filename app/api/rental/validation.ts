import Joi from '@hapi/joi'

const schema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
})

const joiValidation = (movie: any) => schema.validate(movie)

export default joiValidation
