import Rental from '#root/db/models/Rental'
import Movie, { isMovie } from '#root/db/models/Movie'

const getAllRentals = async () => await Rental.find().sort('-dateOut')

const getRentalById = async (id: string) => Rental.findById(id)

const createRental = async (rental: any) => {
  const newRental = new Rental(rental)
  const result: any = await newRental.save()
  const movie = Movie.findById(rental.movie._id)
  if (isMovie(movie)) {
    movie.numberInStock--
    movie.save()
  }
  return result
}

const updateRental = async (id: string, rental: any) => {
  const result = await Rental.findByIdAndUpdate(id, rental, { new: true })
  return result
}

const deleteRental = async (id: string) => {
  const result = await Rental.findByIdAndRemove(id)
  return result
}

export default {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
}
