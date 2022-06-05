const categoryRouter = require('express').Router()
const { CategoryService } = require('../services/category.service')

const service = new CategoryService()

categoryRouter.get('/',
  async (req, res, next) => {
    try {
      const categories = await service.findAll()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = { categoryRouter }
