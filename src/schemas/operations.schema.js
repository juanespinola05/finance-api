const Joi = require('joi')

const monthsRegex = /(january)|(february)|(march)|(april)|(may)|(june)|(july)|(august)|(september)|(october)|(november)|(december)/i

const id = Joi.number().integer()
const userId = Joi.number().integer()
const month = Joi.string().pattern(monthsRegex, 'months')
const year = Joi.number().integer().min(2022)
const concept = Joi.string().min(3).max(60)
const amount = Joi.number().min(0)
const type = Joi.string().pattern(/(income|outflow)/i)
const date = Joi.date()
const offset = Joi.number().integer().min(0)
const limit = Joi.number().integer().min(1)

const getOperationsSchema = Joi.object({
  year: year.required(),
  month: month.required(),
  offset,
  limit
})

const createOperationSchema = Joi.object({
  concept: concept.required(),
  amount: amount.required(),
  type: type.required(),
  date: date.required(),
  userId,
  categoryId: userId.required()
})

const updateOperationSchema = Joi.object({
  concept,
  amount,
  type,
  date
})

const requireIdSchema = Joi.object({
  id: id.required()
})

module.exports = {
  getOperationsSchema,
  createOperationSchema,
  updateOperationSchema,
  requireIdSchema
}
