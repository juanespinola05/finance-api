'use strict'

const { OPERATIONS_TABLE } = require('../models/operations.model')

const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(OPERATIONS_TABLE, {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      concept: {
        allowNull: false,
        type: DataTypes.STRING
      },
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        isIn: [['income', 'outflow']]
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(OPERATIONS_TABLE)
  }
}
