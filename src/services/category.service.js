const { models } = require('../lib/sequelize')

const categories = [
  {
    name: 'Personal'
  },
  {
    name: 'Expenses'
  },
  {
    name: 'Phone'
  },
  {
    name: 'Food'
  }
]

class CategoryService {
  async findAll () {
    const categories = await models.Category.findAll()
    return categories
  }

  // TODO: this is temporal
  static async createCategories () {
    const promises = categories.map(async cat => {
      const res = await models.Category.upsert(cat)
      return res
    })
    await Promise.all(promises)
  }
}

CategoryService.createCategories()

module.exports = { CategoryService }
