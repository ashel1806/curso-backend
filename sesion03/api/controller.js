import Book from "./model.js";
import { getRequestBody } from "./utils.js";

const getAllBooks = async (req, res) => {
  try {
    // Obtenemos los libros de la base de datos
    const books = await Book.findAll();

    // Enviamos la respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

const getBookById = async (req, res, id) => {
  try {
    // Obtenemos el libro de la base de datos
    const book = await Book.findBookById(id);

    // Enviamos la respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    console.error(error);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

const createBook = async (req, res, book) => {
  try {
    // Obtenemos el cuerpo de la petición
    const body = await getRequestBody(req);

    // Obtenemos los datos del libro
    const { title, author, year, pages } = JSON.parse(body);

    // Creamos el libro y lo devolvemos
    const newBook = await Book.createBook({ title, author, year, pages });

    // Enviamos la respuesta
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newBook));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

const updateBook = async (req, res, id) => {
  try {
    // Actualizamos el libro y lo devolvemos
    const bookUpdated = await Book.updateBook(id);

    // Enviamos la respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(bookUpdated));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

const deleteBook = async (req, res, id) => {
  try {
    // Eliminamos el libro y lo devolvemos
    const bookDeleted = await Book.deleteBook(id);

    // Enviamos la respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(bookDeleted));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
