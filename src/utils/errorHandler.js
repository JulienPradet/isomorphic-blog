import q from 'q'
import colors from 'colors'

class HttpResponseError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class BadRequestError extends HttpResponseError {}
export class UnauthorizedError extends HttpResponseError {}
export class ForbiddenError extends HttpResponseError {}
export class InternalServerError extends HttpResponseError {}
export class NotFoundError extends HttpResponseError {}

export function errorHandler(err, req, res, next) {
  if(err instanceof BadRequestError) {
    res.status(400).json(err.message);
  } else if(err instanceof UnauthorizedError) {
    res.status(401).json(err.message);
  } else if(err instanceof ForbiddenError) {
    res.status(403).json(err.message);
  } else if(err instanceof NotFoundError) {
    res.status(404).json(err.message);
  } else if(err instanceof InternalServerError) {
    res.status(500).json(err.message);
  } else {
    console.stack(err);
    res.status(500).json({message: 'It\'s broken. Ouch.'});
  }
}

/* Initialize the handing of errors */
export function initialize(app) {
  const deferred = q.defer();
  console.info("Loading errorHandler...".underline);

  app.use(errorHandler);

  console.info("Done".green);
  deferred.resolve(app);

  return deferred.promise;
}
