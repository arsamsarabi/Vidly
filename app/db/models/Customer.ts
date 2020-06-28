import { Schema, model, Document } from 'mongoose'

export interface ICustomer extends Document {
  name: string
  phone: string
  isGold: boolean
}

const customerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
      trim: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Customer = model<ICustomer>('Customer', customerSchema)

export default Customer
