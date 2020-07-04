import { Schema, model, Document } from 'mongoose'

export interface IRental extends Document {
  customer: {
    name: string
    phone: string
    isGold: boolean
  }
  movie: {
    title: string
    dailyRentalFee: number
  }
  dateOut: string
  dateReturned?: string
  rentalFee?: number
}

const rentalSchema: Schema = new Schema(
  {
    customer: {
      type: new Schema({
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
      }),
      required: true,
    },
    movie: {
      type: new Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Rental = model<IRental>('Rental', rentalSchema)

export default Rental
