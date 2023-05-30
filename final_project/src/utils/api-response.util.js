/* Clase que se encarga de realizar algunas acciones con la petición
y la respuesta del servidor */
class ApiUtil {
  /**
   * Método que se encarga de enviar la respuesta al cliente
   *
   * @param {Response} res Respuesta HTTP
   * @param {number} statusCode Código de estado HTTP
   * @param {Output} data
   */
  static sendResponse(res, statusCode, data) {
    // Cuerpo de la respuesta
    let responseBody = {
      code: statusCode,
      status: 'Success',
      data: data,
    };

    // Si el código de estado es mayor o igual a 400, entonces
    // la respuesta es un error
    if (statusCode >= 400) {
      responseBody.status = 'Error';
      responseBody.error = data.message;
      delete responseBody.data;
    }

    // Enviamos la respuesta
    res.status(statusCode).json(responseBody);
  }
}

export default ApiUtil;

/**
 * @typedef {Object} Output Objeto que contiene la información de la respuesta
 * @property {?string} message Mensaje de la respuesta
 */
