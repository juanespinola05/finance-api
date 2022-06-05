const Joi = require('joi')

const name = Joi.string().min(2).max(50)
const email = Joi.string().email()
const password = Joi.string().min(6)

const checkEmailSchema = Joi.object({
  email: email.required()
})

const registerUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
})

module.exports = { registerUserSchema, checkEmailSchema }
