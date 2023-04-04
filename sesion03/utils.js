/**
 * Función que obtiene el id máximo de un arreglo de datos
 *
 * @param {[Book]} data Arreglo de datos
 * @returns El id del último elemento del arreglo
 */
export const getMaxId = (data) => {
  const ids = data.map((item) => item.id);
  const maxId = Math.max(...ids);

  return maxId;
};

/**
 * Función que obtiene el cuerpo de una petición
 *
 * @param {Request} req Objeto Request de la solicitud
 * @returns {Promise<string>} Promesa que se resuelve con el cuerpo de la petición
 */
export const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
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
