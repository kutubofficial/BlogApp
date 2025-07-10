export const error = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = "User validation failed";
  }
    if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid ID";
  }

  //? global error handler
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errObject: err,
    error_LineNumber: err.stack
  });
};