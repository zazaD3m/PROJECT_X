import { CustomError } from "../utils/CustomError.js";
import { isProduction } from "../utils/helpers.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (err) => {
  return new CustomError("Resource not found", 404);
};

const duplicateKeyErrorHandler = (err) => {
  if (err.keyValue.email) return new CustomError("Email already in use", 409);
  return new CustomError("Duplicate input", 409);
};

const prodErrors = (res, error) => {
  // Only errors created with our CustomError will have isOperational to true
  // So we will only send to client our handled errors
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (!isProduction) {
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    devErrors(res, error);
  } else if (isProduction) {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    prodErrors(res, error);
  }
};

export default globalErrorHandler;
