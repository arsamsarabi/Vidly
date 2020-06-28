import Joi from '@hapi/joi'

import { ICustomer } from '#root/db/models/Customer'

const validateCustomer = (customer: Partial<ICustomer>) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(6).max(50),
    isGold: Joi.bool(),
  })
  const { error, value } = schema.validate(customer)
  return { error, value }
}

export default validateCustomer
