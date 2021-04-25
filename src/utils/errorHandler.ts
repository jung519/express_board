
export const notFoundErrorHandler = (req, res) => {
  const errMsg = 'URL or Method is not found.'
  console.error('notFoundErrorHandler url:', req.url)
  
  return res.status(404).send({ code: 'NO_URL_OR_METHOD', error: { message: errMsg } })
}

export function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);

  const error = {
    code: err.code,
    message: err.code ? err.message : 'An unexpected error'
  }
  res.status(err.status || 400).send(error);
}

export class CustomError extends Error {
  constructor (public code, message, public status = 400) {
    super(message)
  }
}