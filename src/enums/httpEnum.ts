/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  INFO = 203,
  UNAUTH = 401,
  FORBIDDEN = 403,
  NOTFOUND = 404,
  LOCKED = 423,
  ERROR = 500,
  TIMEOUT = 0,
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
