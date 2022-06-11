class AppError extends Error {
  constructor(message, status = 500, errorCode = 500) {
    super(message);
    this.message = message;
    this.status = status;
    this.errorCode = errorCode;
  }
}

module.exports = AppError;
