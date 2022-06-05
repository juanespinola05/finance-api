'use strict'

const { OPERATIONS_TABLE, OperationSchema } = require('../models/operations.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(OPERATIONS_TABLE, OperationSchema.categoryId.field, {
      ...OperationSchema.categoryId
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(OPERATIONS_TABLE, OperationSchema.categoryId.field)
  }
}
