const status = require('http-status')
const groupModel = require('../models/groups.js')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

async function checkGroup (req, res, next) {
  // Code vérifiant que le groupe existe
  const group = await groupModel.findOne({ where: { id: req.params.gid } })
  if (!group) {
    // Provoque une réponse en erreur avec un code de retour 404
    throw new CodeError('The group does not exist', status.NOT_FOUND)
  }
  // On modifie l'objet requête pour mettre le login à disposition pour les middleware suivants
  req.group = group
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

async function checkUser (req, res, next) {
  // Code vérifiant que le groupe existe
  const member = await userModel.findOne({ where: { id: req.params.uid } })
  if (!member) {
    // Provoque une réponse en erreur avec un code de retour 404
    throw new CodeError('The user does not exist', status.NOT_FOUND)
  }
  // On modifie l'objet requête pour mettre le login à disposition pour les middleware suivants
  req.member = member
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

async function checkGroupAccess (req, res, next) {
  // Code vérifiant que le login a les droits d'accès au groupe
  if (!(req.group.ownerId === req.user.id || await req.group.hasMember(req.user) || req.user.isAdmin)) {
    // Provoque une réponse en erreur avec un code de retour 403
    throw new CodeError('You must be the owner/a member of the group or admin', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

async function checkOwnerAdmin (req, res, next) {
  // Code vérifiant que le login est propriétaire ou admin
  if (!(req.group.ownerId === req.user.id || req.user.isAdmin)) {
    // Provoque une réponse en erreur avec un code de retour 403
    throw new CodeError('You must be the owner of the group or admin', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

module.exports = {
  checkGroup,
  checkUser,
  checkGroupAccess,
  checkOwnerAdmin,
  async getGroups (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'List the groups created and managed by the user'
    let data
    if (req.user.isAdmin) {
      data = await groupModel.findAll({ attributes: ['id', 'name', 'ownerId'] })
    } else {
      data = await groupModel.findAll({ attributes: ['id', 'name', 'ownerId'], where: { ownerId: req.user.id } })
    }

    res.json({ status: true, message: 'Returning groups', data })
  },
  async newGroup (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Create a group'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New group' } }
    if (!has(req.body, 'name')) throw new CodeError('You must specify the name', status.BAD_REQUEST)
    const { name } = req.body
    const group = await groupModel.create({ name, ownerId: req.user.id })
    await group.addMember(req.user)
    res.json({ status: true, message: 'Group added' })
  },
  async getGroup (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'List the members of the group'
    const data = await req.group.getMember({ attributes: ['id', 'name', 'email'], joinTableAttributes: [] })
    res.json({ status: true, message: 'Returning members', data })
  },
  async deleteGroup (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Delete a group'
    await groupModel.destroy({ where: { id: req.params.gid } })
    res.json({ status: true, message: 'Group deleted' })
  },
  async newMember (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Add a user to a group'
    if (await req.group.hasMember(req.member)) {
      res.status(status.BAD_REQUEST).json({ status: false, message: 'The member is already in group' })
      return
    }
    await req.group.addMember(req.member)
    res.json({ status: true, message: 'Member added' })
  },
  async deleteMember (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Remove a user from a group'
    if (!(await req.group.hasMember(req.member))) {
      res.status(status.BAD_REQUEST).json({ status: false, message: 'The member is not in group' })
      return
    }

    if (req.group.ownerId === req.user.id || req.user.isAdmin || req.user.id === req.member.id) {
      await req.group.removeMember(req.member)
      res.json({ status: true, message: 'Member deleted' })
    } else {
      res.status(status.FORBIDDEN).json({ status: false, message: 'Member cannot delete another member' })
    }
  },
  async getGroupsMember (req, res) {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'List the groups in which the user is a member'
    const data = await req.user.getGroups({ joinTableAttributes: [] })
    res.json({ status: true, message: 'Returning groups', data })
  }
}
