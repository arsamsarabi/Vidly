import Joi from '@hapi/joi'

import { ICustomer } from '#root/db/models/Customer'

const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(6).max(50).required(),
  isGold: Joi.boolean(),
})

const joiValidation = (customer: Partial<ICustomer>) =>
  schema.validate(customer)

export default joiValidation
