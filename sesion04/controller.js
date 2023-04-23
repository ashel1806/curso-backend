import Book from "./model.js";

const getAllBooks = async (req, res) => {
  try {
    // Obtenemos los libros de la base de datos
    const books = await Book.findAll();

    // Enviamos la respuesta
    res.status(200).json(books)
  } catch (error) {
    res.status(404).json(error)
  }
};

const getBookById = async (req, res) => {
  try {
    // Obtenemos el libro de la base de datos
    const bookId = parseInt(req.params.id)
    const book = await Book.findBookById(bookId);

    // Enviamos la respuesta
    res.status(200).json(book)
  } catch (error) {
    res.status(404).json(error)
  }
};

const createBook = async (req, res) => {
  try {
    // Obtenemos el cuerpo de la petición
    const body = req.body

    // Obtenemos los datos del libro
    const { title, author, year, pages } = body;

    // Creamos el libro y lo devolvemos
    const newBook = await Book.createBook({ title, author, year, pages });

    // Enviamos la respuesta
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json(error)
  }
};

const updateBook = async (req, res) => {
  try {
    // Actualizamos el libro y lo devolvemos
    const bookId = parseInt(req.params.id);
    const bookUpdated = await Book.updateBook(bookId);

    // Enviamos la respuesta
    res.status(200).json(bookUpdated);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    // Eliminamos el libro y lo devolvemos
    const bookId = parseInt(req.params.id);
    const bookDeleted = await Book.deleteBook(bookId);

    // Enviamos la respuesta
    res.status(200).json(bookDeleted);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
