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

/* Initialize the handing of errors */
export function initialize(app) {
  const deferred = q.defer();
  console.info("Loading errorHandler...".underline);

  app.use(function(err, req, res, next) {
    if(err instanceof BadRequestError) {
      res.status(400).json({
        name: err.name,
        message: err.message
      });
    } else if(err instanceof UnauthorizedError) {
      res.status(401).json({
        name: err.name,
        message: err.message
      });
    } else if(err instanceof ForbiddenError) {
      res.status(403).json({
        name: err.name,
        message: err.message
      });
    } else if(err instanceof NotFoundError) {
      res.status(404).json({
        name: err.name,
        message: err.message
      });
    } else if(err instanceof InternalServerError) {
      res.status(500).json({
        name: err.name,
        message: err.message
      });
    } else {
      res.status(500).json({
        name: err.name,
        message: 'Nous avons tout cassé, désolé.'
      });
    }
  });

  console.info("Done".green);
  deferred.resolve(app);

  return deferred.promise;
}
