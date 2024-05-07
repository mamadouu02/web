const app = require('../app')
const request = require('supertest')

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
