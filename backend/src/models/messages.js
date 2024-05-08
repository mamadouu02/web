const Sequelize = require('sequelize')
const db = require('./database.js')
const users = require('./users.js')
const groups = require('./groups.js')

const messages = db.define('messages', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING(128)
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, { timestamps: false })

users.hasMany(messages, { onDelete: 'CASCADE', sourceKey: 'email' })
messages.belongsTo(users)

groups.hasMany(messages, { onDelete: 'CASCADE' })
messages.belongsTo(groups)

module.exports = messages
