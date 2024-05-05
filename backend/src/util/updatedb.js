const userModel = require('../models/users.js')
const bcrypt = require('bcrypt')
// Ajouter ici les nouveaux require des nouveaux modèles
const groupModel = require('../models/groups.js')
const messageModel = require('../models/messages.js');

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)

  const users = []
  users[1] = await userModel.create({ name: 'Sebastien Viardot', email: 'Sebastien.Viardot@grenoble-inp.fr', passhash, isAdmin: true })
  users[2] = await userModel.create({ name: 'Sylvain Bouveret', email: 'Sylvain.Bouveret@grenoble-inp.fr', passhash, isAdmin: false })
  users[3] = await userModel.create({ name: 'Franck Rousseau', email: 'Franck.Rousseau@grenoble-inp.fr', passhash, isAdmin: false })
  users[4] = await userModel.create({ name: 'Nils Gesbert', email: 'Nils.Gesbert@grenoble-inp.fr', passhash, isAdmin: false })

  const groups = []
  groups[1] = await groupModel.create({ name: 'GroupOne', ownerId: 1 })
  groups[2] = await groupModel.create({ name: 'GroupTwo', ownerId: 2 })

  await groups[1].addMember(users[1])
  await groups[1].addMember(users[2])
  await groups[1].addMember(users[3])
  await groups[1].addMember(users[4])
  await groups[2].addMember(users[2])

  const messages = []
  messages[1] = await messageModel.create({ content: 'Hello !' })
  messages[2] = await messageModel.create({ content: 'Bonjour ! Est-ce que vous allez bien ?' })
  messages[3] = await messageModel.create({ content: 'Oui' })
  messages[4] = await messageModel.create({ content: "J'entends rien, est-ce que vous allez bien ?" })

  await users[1].addMessage(messages[1])
  await users[2].addMessage(messages[2])
  await users[1].addMessage(messages[3])
  await users[2].addMessage(messages[4])
  await groups[1].addMessage(messages[1])
  await groups[1].addMessage(messages[2])
  await groups[1].addMessage(messages[3])
  await groups[1].addMessage(messages[4])
})()
