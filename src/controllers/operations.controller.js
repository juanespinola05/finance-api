const operationsRouter = require('express').Router()
const { handleValidation } = require('../middlewares/validation.handler')
const { OperationsService } = require('../services/operations.service')
const {
  getOperationsSchema,
  createOperationSchema,
  updateOperationSchema,
  requireIdSchema
} = require('../schemas/operations.schema')
const { getUserFromToken } = require('../middlewares/getUserFromToken')
const { validateUserInToken } = require('../middlewares/validateUserInToken')
const service = new OperationsService()

operationsRouter.post('/',
  getUserFromToken,
  validateUserInToken,
  handleValidation(createOperationSchema, 'body'),
  async (req, res, next) => {
    const data = {
      ...req.body,
      userId: req.user.id
    }
    try {
      const newOperation = await service.create(data)
      res.status(201).json(newOperation)
    } catch (error) {
      next(error)
    }
  }
)

operationsRouter.get('/:year/:month',
  handleValidation(getOperationsSchema, 'params'),
  getUserFromToken,
  validateUserInToken,
  async (req, res, next) => {
    try {
      const { year, month, limit, offset } = req.params
      const operations = await OperationsService.findByMonth({
        email: req.user.email,
        year,
        month,
        limit,
        offset
      })
      res.status(200).json(operations)
    } catch (error) {
      next(error)
    }
  }
)

operationsRouter.patch('/edit/:id',
  handleValidation(updateOperationSchema, 'body'),
  handleValidation(requireIdSchema, 'params'),
  getUserFromToken,
  validateUserInToken,
  async (req, res, next) => {
    const { id } = req.params
    try {
      const operationChanges = await service.update(id, req.body)
      res.status(200).json(operationChanges)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = { operationsRouter }
