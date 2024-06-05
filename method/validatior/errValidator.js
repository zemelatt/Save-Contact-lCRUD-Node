module.exports.validErr = (error) => {
  return error && error.details && error.details[0].message.length > 0;
};
