import Joi from '@hapi/joi'

const validateGenre = (genre: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  })
  const { error, value } = schema.validate(genre)
  return { error, value }
}

export default validateGenre
