'use strict'

const { USER_TABLE } = require('../models/user.model')
const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'username')
  },

  async down (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'username', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    })
  }
}
