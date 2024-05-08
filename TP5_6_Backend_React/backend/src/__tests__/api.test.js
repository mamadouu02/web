const app = require('../app')
const request = require('supertest')

/* Users */

async function getToken (email, password) {
  const response = await request(app)
    .post('/login')
    .send({ email, password })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  return response.body.token
}

test('Endpoint not found', async () => {
  const response = await request(app)
    .get('/')
  expect(response.statusCode).toBe(404)
  expect(response.body.message).toBe('Endpoint Not Found')
})

test('User cannot register without name', async () => {
  const response = await request(app)
    .post('/register')
    .send({ email: 'John.Doe@acme.com', password: 'Test123!' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the name and email')
})

test('User cannot register without email', async () => {
  const response = await request(app)
    .post('/register')
    .send({ name: 'John Doe', password: 'Test123!' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the name and email')
})

test('User cannot register without password', async () => {
  const response = await request(app)
    .post('/register')
    .send({ name: 'John Doe', email: 'John.Doe@acme.com' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the name and email')
})

test('User cannot register with weak password', async () => {
  const response = await request(app)
    .post('/register')
    .send({ name: 'John Doe', email: 'John.Doe@acme.com', password: 'password' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('Weak password!')
})

test('User can register', async () => {
  const response = await request(app)
    .post('/register')
    .send({ name: 'John Doe', email: 'John.Doe@acme.com', password: 'Test123!' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body.message).toBe('User Added')
})

test('User cannot register with existing email', async () => {
  const response = await request(app)
    .post('/register')
    .send({ name: 'Sebastien Viardot', email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(400)
})

test('User cannot log in without email', async () => {
  const response = await request(app)
    .post('/login')
    .send({ password: 'Test123!' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the email and password')
})

test('User cannot log in without password', async () => {
  const response = await request(app)
    .post('/login')
    .send({ email: 'John.Doe@acme.com' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the email and password')
})

test('User cannot log in with wrong email', async () => {
  const response = await request(app)
    .post('/login')
    .send({ email: 'wrong@example.com', password: 'Test123!' })
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('status', false)
  expect(response.body.message).toBe('Wrong email/password')
})

test('User cannot log in with wrong password', async () => {
  const response = await request(app)
    .post('/login')
    .send({ email: 'John.Doe@acme.com', password: 'wrong_password' })
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('status', false)
  expect(response.body.message).toBe('Wrong email/password')
})

test('User can log in and list users', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body.message).toBe('Login/Password ok')
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/users')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body.message).toBe('Returning users')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('User cannot list users without token', async () => {
  const response = await request(app)
    .get('/api/users')
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('Token missing')
})

test('User cannot list users with invalid token', async () => {
  const response = await request(app)
    .get('/api/users')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20ifQ.3MkY4SoyXO9mP_Dk1FiS1VwTtXTsCyEVVMjA3BqlPC0')
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('Token invalid')
})

test('User cannot update password without password', async () => {
  const token = await getToken('John.Doe@acme.com', 'Test123!')

  const response = await request(app)
    .put('/api/password')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the password')
})

test('User cannot update password with weak password', async () => {
  const token = await getToken('John.Doe@acme.com', 'Test123!')

  const response = await request(app)
    .put('/api/password')
    .set('x-access-token', token)
    .send({ password: 'password' })
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('Weak password!')
})

test('User can update password', async () => {
  const token = await getToken('John.Doe@acme.com', 'Test123!')

  const response = await request(app)
    .put('/api/password')
    .set('x-access-token', token)
    .send({ password: 'Test321!' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body).toHaveProperty('message', 'Password updated')
})

test('Admin can update user', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .put('/api/users/5')
    .set('x-access-token', token)
    .send({ name: 'Doe John', password: 'Test123!' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body).toHaveProperty('message', 'User updated')
})

test('Admin cannot update user without name, email or password', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .put('/api/users/5')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the name, email or password')
})

test('Non-admin cannot update user', async () => {
  const token = await getToken('John.Doe@acme.com', 'Test123!')

  const response = await request(app)
    .put('/api/users/5')
    .set('x-access-token', token)
    .send({ password: 'Test321!' })
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('You must be an admin')
})

test('Non-admin cannot delete user', async () => {
  const token = await getToken('John.Doe@acme.com', 'Test123!')

  const response = await request(app)
    .delete('/api/users/5')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('You must be an admin')
})

test('Admin can delete user', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/users/5')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('status', true)
  expect(response.body).toHaveProperty('message', 'User deleted')
})

test('token of an unexisting user cannot be used', async () => {
  const response = await request(app)
    .get('/api/users')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Sm9obi5Eb2VAYWNtZS5jb20.uN3w4hi517Q7ouruwX-HHqqmgDkm-J2Wk6tJFNfB0Z0')
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'Inconsistent token')
})

/* Groups */

test('Group not found', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups/0')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(404)
  expect(response.body).toHaveProperty('message', 'The group does not exist')
})

test('User not found', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups/1/0')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(404)
  expect(response.body).toHaveProperty('message', 'The user does not exist')
})

test('Admin can list groups', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Non-admin can list groups', async () => {
  const token = await getToken('Sylvain.Bouveret@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
})

test('User cannot create a group without name', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .post('/api/mygroups')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'You must specify the name')
})

test('User can create a group', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .post('/api/mygroups')
    .set('x-access-token', token)
    .send({ name: 'GroupThree' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Group added')
})

test('User can list members', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning members')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Non-admin, non-owner or non-member cannot list members', async () => {
  const token = await getToken('Sylvain.Bouveret@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/mygroups/3')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'You must be the owner/a member of the group or admin')
})

test('Admin or owner can add a member', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .put('/api/mygroups/3/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Member added')
})

test('Admin or owner cannot add an existing member', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .put('/api/mygroups/3/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'The member is already in group')
})

test('Admin or owner can delete another member', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/mygroups/3/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Member deleted')
})

test('Admin or owner cannot delete an unexisting member', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/mygroups/3/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'The member is not in group')
})

test('Member cannot delete another member', async () => {
  const token = await getToken('Sylvain.Bouveret@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/mygroups/1/3')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'Member cannot delete another member')
})

test('Admin or owner can delete a group', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/mygroups/3')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Group deleted')
})

test('Non-admin or non-owner cannot delete a group', async () => {
  const token = await getToken('Sylvain.Bouveret@grenoble-inp.fr', '123456')

  const response = await request(app)
    .delete('/api/mygroups/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'You must be the owner of the group or admin')
})

test('User can list groups in which he is a member', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/groupsmember')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
  expect(response.body.data.length).toBeGreaterThan(0)
})

/* Messages */

test('Non-member cannot send message', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/messages/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('You must be a member of the group')
})

test('Member can list messages', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .get('/api/messages/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Returning messages')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Member cannot send message without content', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the content of the message')
})

test('Member can send message', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr', '123456')

  const response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', token)
    .send({ content: 'OUI !!!' })
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Message posted')
})
