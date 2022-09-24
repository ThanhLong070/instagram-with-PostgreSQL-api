// @ts-nocheck
class ServerError extends Error {
  constructor(status, message, nameCode, errorCode) {
    super(message);
    this.status = status;
    this.message = message;
    this.nameCode = nameCode;
    this.errorCode = errorCode;
  }
}

module.exports = {
  ServerError,

  throwError: (error) => {
    const { STATUS, MESSAGE, NAME_CODE, ERROR_CODE } = error;

    throw new ServerError(STATUS, MESSAGE, NAME_CODE, ERROR_CODE);
  },
};
