import pick from 'lodash/pick'
import bcrypt from 'bcrypt'

import User, { IUser } from '#root/db/models/User'

const registerUser = async (requestData: IUser) => {
  const user = new User(pick(requestData, ['name', 'email', 'password']))

  const salt = await bcrypt.genSalt(12)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()
  const result = pick(user, ['_id', 'name', 'email'])
  return result
}

export default {
  registerUser,
}
