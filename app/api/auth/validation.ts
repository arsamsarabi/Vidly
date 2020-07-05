import Joi from '@hapi/joi'

const schema = Joi.object({
  email: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
})

const validateLogin = (user: any) => schema.validate(user)

export default { validateLogin }
