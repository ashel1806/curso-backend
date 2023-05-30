import { HTTP_CODES } from '../common/constants/constants.js';
import {
  ConnectionError,
  ValidationError,
  DuplicateValueError,
  MissedFieldsError,
  UnauthorizedError,
} from '../common/errors/errors.js';
import ApiUtil from '../utils/api-response.util.js';

/**
 * Función que obtiene los campos que se han omitido en la petición
 *
 * @param {Error} err El error que se ha lanzado
 * @param {Response} res La respuesta HTTP que se enviará
 *
 * @returns {string} Los campos que se han omitido
 */
const handleMissedFieldsError = (err, res) => {
  const missedFields = Object.values(err.missedFields).map(
    (field) => field.path
  );
  const missedFieldsString = missedFields.join(', ');

  return missedFieldsString;
};

/**
 * Función middleware que maneja los errores que se lanzan en la aplicación
 *
 * @param {Error} err El error que se ha lanzado
 * @param {Request} req La petición HTTP que se ha realizado
 * @param {Response} res La respuesta HTTP que se enviará
 * @param {Function} next Función que llama al siguiente middleware
 *
 * @returns {Response} La respuesta HTTP con el error
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ConnectionError) {
    return ApiUtil.sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, {
      message: err.message,
    });
  }

  if (err instanceof DuplicateValueError) {
    return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, {
      message: `${err.duplicateValue} is already in use`,
    });
  }

  if (err instanceof MissedFieldsError) {
    const missedFields = handleMissedFieldsError(err, res);

    return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, {
      message: `Missed required fields: ${missedFields}`,
    });
  }

  if (err instanceof UnauthorizedError) {
    return ApiUtil.sendResponse(res, HTTP_CODES.UNAUTHORIZED, {
      message: err.message,
    });
  }

  return ApiUtil.sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
    message: err.message || 'Something went wrong',
  })
};

export default errorHandler;
