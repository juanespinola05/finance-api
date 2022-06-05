'use strict'

const { DataTypes, Sequelize } = require('sequelize')
const { CATEGORY_TABLE } = require('../models/category.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE)
  }
}
