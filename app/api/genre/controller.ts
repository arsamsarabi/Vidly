import Genre, { IGenre } from '#root/db/models/Genre'

const getAllGenres = async () => await Genre.find().sort('name')

const getGenreById = async (id: string) => Genre.findById(id)

const createGenre = async (genre: { name: string }) => {
  const newGenre = new Genre(genre)
  const result: IGenre = await newGenre.save()
  return result
}

const updateGenre = async (id: string, genre: { name: string }) => {
  const result = await Genre.findOneAndUpdate({ id }, genre, { new: true })
  return result
}

const deleteGenre = async (id: string) => {
  const result = Genre.findByIdAndRemove({ id })
  return result
}

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
}
