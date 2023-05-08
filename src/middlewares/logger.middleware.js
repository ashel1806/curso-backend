const logger = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body: ', req.body)
  }

  next()
}

export default logger
