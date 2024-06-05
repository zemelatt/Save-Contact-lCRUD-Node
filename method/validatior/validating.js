const joi = require("joi");

module.exports.schema = joi.object().keys({
  name: joi.string().min(2).max(10).required(),
  number: joi.string().min(9).max(13).required(),
  pid: joi.allow(),
  // .messages({
  //     'number.min': 'OTP should be 4 digit.',
  //     'number.max': 'OTP should be 4 digit'
  // })
});
