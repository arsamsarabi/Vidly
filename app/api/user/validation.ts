import Joi from '@hapi/joi'

const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
})

const joiValidation = (movie: any) => schema.validate(movie)

export default joiValidation
