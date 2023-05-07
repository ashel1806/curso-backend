export const bodyLogger = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' && req.body) {
    console.log('Body: ', req.body);
  }

  next();
}
