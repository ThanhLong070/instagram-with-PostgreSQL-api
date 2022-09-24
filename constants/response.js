const variables = require('../constants/variables');
const statusCode = require('../constants/statusCode');

const ucFirstCharacter = require('../utils/stringHandle');
const { throwError } = require('../utils/errorHandle');

/* Response handle */
const responseHandle = (status, message, nameCode, errorCode) => {
  const STATUS = status;
  const MESSAGE = ucFirstCharacter(message);
  const NAME_CODE = nameCode;
  const ERROR_CODE = errorCode;

  return { STATUS, MESSAGE, NAME_CODE, ERROR_CODE };
};

module.exports = {
  /* Response handle */
  responseHandle,

  NOT_FOUND: () => {
    const error = responseHandle(
      statusCode.NOT_FOUND,
      `${variables.COMMON.NOT_FOUND}`,
      variables.NAME_CODE.API.NOT_FOUND,
      variables.ERROR_CODE.API.NOT_FOUND
    );
    throwError(error);
  },

  FIELD_REQUIRED: () => {
    const error = responseHandle(
      statusCode.UNPROCESSABLE_ENTITY,
      `${variables.ATTR.ALL} ${variables.ATTR.FIELD_REQUIRED}`,
      variables.NAME_CODE.DATA,
      variables.ERROR_CODE.FIELD_REQUIRED
    );
    throwError(error);
  },

  INVALID_VALUE: () => {
    const error = responseHandle(
      statusCode.UNPROCESSABLE_ENTITY,
      `${variables.ATTR.INVALID} ${variables.ATTR.VALUE}`,
      variables.NAME_CODE.DATA,
      variables.ERROR_CODE.INVALID.VALUE
    );
    throwError(error);
  },

  NOT_EXISTS_USER: () => {
    const error = responseHandle(
      statusCode.UNPROCESSABLE_ENTITY,
      `${variables.ATTR.USER} ${variables.ATTR.NOT_EXISTS}`,
      variables.NAME_CODE.USER.SELF,
      variables.ERROR_CODE.NOT_EXISTS
    );
    throwError(error);
  },

  PASSWORD_INCORRECT: () => {
    const error = responseHandle(
      statusCode.UNAUTHORIZED,
      `${variables.ATTR.PASSWORD} ${variables.ATTR.INCORRECT}`,
      variables.NAME_CODE.USER.PASSWORD,
      variables.ERROR_CODE.API.UNAUTHORIZED
    );
    throwError(error);
  },

  NOT_EXISTS_POST: () => {
    const error = responseHandle(
      statusCode.UNPROCESSABLE_ENTITY,
      `${variables.ATTR.POST} ${variables.ATTR.NOT_EXISTS}`,
      variables.NAME_CODE.POST.SELF,
      variables.ERROR_CODE.NOT_EXISTS
    );
    throwError(error);
  },

  UNAUTHORIZED: () => {
    const error = responseHandle(
      statusCode.UNAUTHORIZED,
      `${variables.COMMON.UNAUTHORIZED}`,
      variables.NAME_CODE.API.UNAUTHORIZED,
      variables.ERROR_CODE.API.UNAUTHORIZED
    );
    throwError(error);
  },

  VALIDATE_DATA: (message) => {
    const error = responseHandle(
      statusCode.UNPROCESSABLE_ENTITY,
      message,
      variables.NAME_CODE.DATA,
      variables.ERROR_CODE.DATA
    );
    throwError(error);
  },
};
