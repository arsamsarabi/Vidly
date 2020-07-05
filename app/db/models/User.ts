import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  password: string
  email: string
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
)

const User = model<IUser>('User', userSchema)

export default User
export { userSchema }
