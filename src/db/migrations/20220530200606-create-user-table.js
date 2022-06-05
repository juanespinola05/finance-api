'use strict'

const { USER_TABLE } = require('../models/user.model')
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
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
    await queryInterface.dropTable(USER_TABLE)
  }
}
