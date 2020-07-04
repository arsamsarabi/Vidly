import Joi from '@hapi/joi'

const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
})

const joiValidation = (genre: any) => schema.validate(genre)

export default joiValidation
export { schema as genreSchema }
