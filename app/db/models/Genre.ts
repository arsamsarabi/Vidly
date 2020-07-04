import { Schema, model, Document } from 'mongoose'

export interface IGenre extends Document {
  name: string
}

const genreSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      // lowercase: true,
      // uppercase: true,
      // match: /pattern/
      // enum: ['sci-fi', 'comedy', 'thriller']
      // min & max for numbers
      // validate: {
      //   validator: function (value: string) {
      //     return value.length > 0
      //   },
      //   message: 'Error message'
      // }
      // validate: {
      //   isAsync: true,
      //   validator: function (value: string, callback: Function) {
      //     const result = value && value.length > 0
      //     callback(result)
      //   },
      //   message: 'Error message',
      // },
      // get: (value: number) => Math.round(value),
      // set: (value: number) => Math.round(value)
    },
  },
  {
    timestamps: true,
  }
)

const Genre = model<IGenre>('Genre', genreSchema)

export default Genre
export { genreSchema }
