// Custom error based on MDN docs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES5_Custom_Error_Object

function RejectError(message, fileName, lineNumber) {
  const instance = new Error(message, fileName, lineNumber);

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  Error.captureStackTrace(instance, RejectError);

  return instance;
}

RejectError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(RejectError, Error);
} else {
  RejectError.__proto__ = Error; // eslint-disable-line no-proto
}

export default RejectError;
