const app = require('../app')
const request = require('supertest')

test('Non-member cannot send message', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/messages/2')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('You must be a member of the group')
})

test('Member can list messages', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/messages/1')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Returning messages')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Member cannot send message without content', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the content of the message')
})

test('Member can send message', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', response.body.token)
    .send({ content: 'OUI !!!' })
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Message posted')
})
