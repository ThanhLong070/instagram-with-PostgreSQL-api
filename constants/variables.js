module.exports = {
  SERVER_LISTENING_ON_PORT: 'Server listening on port',
  THE_SERVER_IS_BUSY: 'The server is busy!',
  DB_LOADED: '✌️ DB loaded and connected!',
  REDIS_LOADED: '✌️ Redis loaded',
  EXPRESS_LOADED: '✌️ Express loaded',
  POSTGRES_SQL_CONNECTED: '✌️ PostgresSql Connected',
  POSTGRES_SQL_CONNECTION_ERROR: '🔥 PostgresSql Connection Error',
  REDIS_CLIENT_ERROR: 'Redis Client Error',
  SUCCESSFUL_LOGOUT: '✌️ Successful logout!',
  UPLOADED_PHOTOS: '✌️ Uploaded Photos!',
  UPLOADED_AVATAR: '✌️ Uploaded Avatar!',
  SUCCESSFUL_DELETE_POST: '✌️ Successful delete post!',

  COMMON: {
    ERROR: 'Error',
    SUCCESS: 'Success',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not found',
    UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_IMPLEMENTED: 'Not Implemented',
    SERVICE_UNAVAILABLE: 'Service Unavailable',
  },

  ATTR: {
    ALL: 'all',
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',

    USER: 'user',
    EMAIL: 'email',
    PASSWORD: 'password',
    AVATAR: 'avatar',
    FULL_NAME: 'full name',
    USER_NAME: 'user name',
    PHONE_NUMBER: 'phone number',
    GENDER: 'gender',

    POST: 'post',
    NOTE: 'note',
    LOCATION: 'location',
    IS_HIDE_LIKES: 'is hide likes',
    IS_TURN_OFF_COMMENTING: 'is turn off commenting',

    COMMENT: 'comment',
    LIKES: 'likes',

    FOLLOWER: 'follower',

    LIKE: 'like',

    PHOTO: 'photo',

    REPORT: 'report',

    FIELD_REQUIRED: 'field required',
    INVALID: 'invalid',
    NOT_MATCH: 'not match',
    INCORRECT: 'incorrect',

    EXISTS: 'already exists',
    NOT_EXISTS: 'not exists',
  },

  NAME_CODE: {
    USER: {
      SELF: 1,
      EMAIL: 2,
      PASSWORD: 3,
      AVATAR: 4,
      FULL_NAME: 5,
      USER_NAME: 6,
      PHONE_NUMBER: 7,
      GENDER: 8,
    },
    POST: {
      SELF: 9,
      NOTE: 10,
      LOCATION: 11,
      IS_HIDE_LIKES: 12,
      IS_TURN_OFF_COMMENTING: 13,
    },
    COMMENT: {
      SELF: 14,
      LIKES: 15,
    },
    FOLLOWER: {
      SELF: 16,
    },
    LIKE: {
      SELF: 17,
    },
    PHOTO: {
      SELF: 18,
      NAME: 19,
    },
    REPORT: {
      SELF: 20,
      DESCRIPTION: 21,
    },

    DATA: 22,

    API: {
      UNAUTHORIZED: 23,
      NOT_FOUND: 24,
      UNPROCESSABLE_ENTITY: 25,
      INTERNAL_SERVER_ERROR: 26,
      NOT_IMPLEMENTED: 27,
      SERVICE_UNAVAILABLE: 28,
    },
  },

  ERROR_CODE: {
    FAIL: -2,
    ERROR: -1,
    SUCCESS: 0,

    FIELD_REQUIRED: 1,
    INVALID: {
      TYPE: 2,
      VALUE: 3,
      KEY: 4,
      SELF: 5,
    },
    NOT_MATCH_PASSWORD: 6,

    EXISTS: 7,
    ALREADY_EXISTS: 8,
    NOT_EXISTS: 9,
    INCORRECT: 10,

    API: {
      UNAUTHORIZED: 11,
      NOT_FOUND: 12,
      UNPROCESSABLE_ENTITY: 13,
      INTERNAL_SERVER_ERROR: 14,
      SERVICE_UNAVAILABLE: 15,
    },
  },
};
