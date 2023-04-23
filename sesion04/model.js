import data from "./data.js";

/**
 * Función que devuelve todos los libros
 *
 * @returns {Promise<{error: boolean, data: [Book]}>}
 */
const findAll = () => {
  return new Promise((resolve, reject) => {
    // Si no hay libros en la base de datos se rechaza la promesa
    if (data.length === 0) {
      reject({
        error: true,
        message: "No hay libros en la base de datos",
      });
    }

    // Si hay libros se resuelve la promesa
    resolve({
      error: false,
      data,
    });
  });
};

/**
 * Función que devuelve un libro según su id
 *
 * @param {number} id Identificador del libro
 *
 * @returns {Promise<{error: boolean, data: Book}>}
 */
const findBookById = (id) => {
  return new Promise((resolve, reject) => {
    // Buscamos el libro en la base de datos
    const book = data.find((book) => book.id === id);

    // Si no se encuentra el libro se rechaza la promesa
    if (!book) {
      reject({
        error: true,
        message: `No se ha encontrado el libro con id ${id}`,
      });
    }

    // Si se encuentra el libro se resuelve la promesa
    resolve({
      error: false,
      data: book,
    });
  });
};

/**
 * Función que crea un libro
 *
 * @param {Book} book Libro a crear
 *
 * @returns {Promise<{error: boolean, data: Book}>}
 */
const createBook = (book) => {
  return new Promise((resolve, reject) => {
    // Validamos que el libro tenga todos los campos obligatorios
    // Si no tiene todos los campos obligatorios se rechaza la promesa
    if (!book.title || !book.author || !book.year || !book.pages) {
      reject({
        error: true,
        message: "El libro no tiene todos los campos",
      });
    }

    // Se crea el nuevo libro con los datos enviados y le asignamos un id
    // usando la función getMaxId y se le asigna el estado de disponible
    const newBook = {
      ...book,
      id: getMaxId(data) + 1,
      available: true,
    };

    // Se agrega el nuevo libro a la base de datos
    data.push(newBook);

    // Se resuelve la promesa
    resolve({
      error: false,
      data: newBook,
    });
  });
};

/**
 * Función que actualiza un libro y cambia el estado de disponibilidad
 *
 * @param {number} id Identificador del libro a actualizar
 *
 * @returns {Promise<{error: boolean, data: Book}>}
 */
const updateBook = (id) => {
  return new Promise((resolve, reject) => {
    // Se busca el libro a actualizar, en la base de datos
    const bookToUpdate = data.find((book) => book.id === id);

    // Si no se encuentra el libro se rechaza la promesa
    if (!bookToUpdate) {
      reject({
        error: true,
        message: `No se ha encontrado el libro con id ${id}`,
      });
    }

    // Se cambia el estado de disponibilidad del libro
    bookToUpdate.available = !bookToUpdate.available;

    // Se resuelve la promesa
    resolve({
      error: false,
      data: bookToUpdate,
    });
  });
};

/**
 * Función que elimina un libro de la data
 *
 * @param {number} id Identificador del libro a eliminar
 *
 * @returns {Promise<{error: boolean, data: Book}>}
 */
const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    // Se busca el libro a eliminar, en la base de datos
    const bookToDelete = data.find((book) => book.id === id);

    // Si no se encuentra el libro se rechaza la promesa
    if (!bookToDelete) {
      reject({
        error: true,
        message: `No se ha encontrado el libro con id ${id}`,
      });
    }

    // Buscamos el índice del libro a eliminar
    const index = data.indexOf(bookToDelete);

    // Eliminamos el libro de la base de datos
    data.splice(index, 1);

    // Se resuelve la promesa
    resolve({
      error: false,
      data: bookToDelete,
    });
  });
};

export default {
  findAll,
  findBookById,
  createBook,
  updateBook,
  deleteBook,
};

/**
 * @typedef {Object} Book
 *
 * @property {number} id Identificador único del libro
 * @property {string} title Título del libro
 * @property {string} author Autor del libro
 * @property {number} year Año de publicación del libro
 * @property {number} pages Número de páginas del libro
 * @property {boolean} available Indica si el libro está disponible o no
 */
