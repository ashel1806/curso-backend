class ApiUtil {
  static sendResponse(res, statusCode, data) {
    let responseBody = {
      code: statusCode,
      message: 'Success',
      data: data,
    };

    if (statusCode >= 400) {
      responseBody.message = 'Error';
      responseBody.error = data.message;
      delete responseBody.data;
    }

    res.status(statusCode).json(responseBody);
  }
}

export default ApiUtil;
