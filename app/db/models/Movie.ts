import { Schema, model, Document } from 'mongoose'
import { genreSchema } from './Genre'

export interface IMovie extends Document {
  title: string
  genre: { _id: string; name: string }[]
  numberInStock: number
  dailyRentalRate: number
}

const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
    },
    genre: {
      type: [genreSchema],
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  },
  {
    timestamps: true,
  }
)

const Movie = model<IMovie>('Movie', movieSchema)

export default Movie
