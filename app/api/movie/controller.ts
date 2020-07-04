import Movie, { IMovie } from '#root/db/models/Movie'

const getAllMovies = async () => await Movie.find().sort('name')

const getMovieById = async (id: string) => Movie.findById(id)

const createMovie = async (movie: Partial<IMovie>) => {
  const newMovie = new Movie(movie)
  const result: IMovie = await newMovie.save()
  return result
}

const updateMovie = async (id: string, movie: Partial<IMovie>) => {
  const result = await Movie.findByIdAndUpdate(id, movie, { new: true })
  return result
}

const deleteMovie = async (id: string) => {
  const result = await Movie.findByIdAndRemove(id)
  return result
}

export default {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
}
