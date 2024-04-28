const userModel = require('../models/users.js')
const bcrypt = require('bcrypt')
// Ajouter ici les nouveaux require des nouveaux modèles
const groupModel = require('../models/groups.js');

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)
  let user
  user = await userModel.create({
    name: 'Sebastien Viardot', email: 'Sebastien.Viardot@grenoble-inp.fr', passhash, isAdmin: true
  })
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
  const group = await groupModel.create({
    name: 'GroupOne', ownerId: 1
  })
  await group.addMember(user)
  user = await userModel.create({
    name: 'Sylvain Bouveret', email: 'Sylvain.Bouveret@grenoble-inp.fr', passhash, isAdmin: false
  })
  await group.addMember(user)
  user = await userModel.create({
    name: 'Franck Rousseau', email: 'Franck.Rousseau@grenoble-inp.fr', passhash, isAdmin: false
  })
  await group.addMember(user)
  user = await userModel.create({
    name: 'Nils Gesbert', email: 'Nils.Gesbert@grenoble-inp.fr', passhash, isAdmin: false
  })
  await group.addMember(user)
})()
