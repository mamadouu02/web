const status = require('http-status')
const messageModel = require('../models/messages.js')
const groupModel = require('../models/groups.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

async function checkMember (req, res, next) {
  // Code vérifiant que le login est membre du groupe
  if (!(await req.group.hasMember(req.user))) {
    // Provoque une réponse en erreur avec un code de retour 403
    throw new CodeError('You must be a member of the group', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

module.exports = {
  checkMember,
  async getMessages (req, res) {
    // #swagger.tags = ['Messages']
    // #swagger.summary = 'List all messages posted in a group'
    const data = await messageModel.findAll({ where: { id: req.params.gid } })
    res.json({ status: true, message: 'Returning messages', data })
  },
  async sendMessage (req, res) {
    // #swagger.tags = ['Messages']
    // #swagger.summary = 'Send a message to a group'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $content: 'Hello !' } }
    if (!has(req.body, 'content')) throw new CodeError('You must specify the content of the message', status.BAD_REQUEST)
    const { content } = req.body
    const message = await groupModel.create({ content })
    await req.user.createMessage(message)
    await req.group.createMessage(message)
    res.json({ status: true, message: 'Message posted' })
  }
}
