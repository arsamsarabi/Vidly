import bcrypt from 'bcrypt'

import User from '#root/db/models/User'

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email })
  if (!user) throw new Error('Invalid email or password.')

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) throw new Error('Invalid email or password.')

  return user
}

export default {
  loginUser,
}
