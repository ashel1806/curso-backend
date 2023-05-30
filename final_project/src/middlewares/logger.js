/**
 * Función middleware que muestra por consola el body de las peticiones POST y PUT
 * @param {Request} req Petición que se ha realizado
 * @param {Response} res Respuesta HTTP que se enviará
 * @param {Function} next Función que llama al siguiente middleware
 */
export const bodyLogger = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' && req.body) {
    console.log('Body: ', req.body);
  }

  next();
}
