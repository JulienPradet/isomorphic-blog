var q = require('q')
  , colors = require('colors');

function HttpResponseError(name, message) {
  this.type = 'http';
  this.name = name;
  this.message = message;
}
HttpResponseError.prototype = Error.prototype;

/* BadRequestError */
function BadRequestError(message) {
  HttpResponseError('BadRequestError', message);
}
BadRequestError.prototype = HttpResponseError.prototype;

/* UnauthorizedError */
function UnauthorizedError(message) {
  HttpResponseError('UnauthorizedError', message);
}
UnauthorizedError.prototype = HttpResponseError.prototype;

/* ForbiddenError */
function ForbiddenError(message) {
  HttpResponseError('ForbiddenError', message);
}
ForbiddenError.prototype = HttpResponseError.prototype;

/* InternalServerError */
function InternalServerError(message) {
  HttpResponseError('BadRequestError', message);
}
InternalServerError.prototype = InternalServerError.prototype;

/* NotFoundError */
function NotFoundError(message) {
  HttpResponseError('BadRequestError', message);
}
NotFoundError.prototype = NotFoundError.prototype;

/* Initialize the handing of errors */
function initialize(app) {
  var deferred = q.defer();
  console.info("Loading errorHandler...".underline);

  app.use(function(err, req, res, next) {
    console.error(err.stack);
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
    } else if(err instanceof ForbiddenError || err.code === 'EBADCSRFTOKEN') {
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

module.exports = {
  BadRequestError: BadRequestError,
  UnauthorizedError: UnauthorizedError,
  ForbiddenError: ForbiddenError,
  InternalServerError: InternalServerError,
  NotFoundError: NotFoundError,
  initialize: initialize
}
