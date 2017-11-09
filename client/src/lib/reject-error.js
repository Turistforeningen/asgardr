function RejectError(message) {
  this.name = 'RejectError';
  this.message = (message || '');
}

RejectError.prototype = Error.prototype;

export default RejectError;
