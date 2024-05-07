const app = require('../app')
const request = require('supertest')

async function getToken (email) {
  const response = await request(app)
    .post('/login')
    .send({ email, password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  return response.body.token
}

test('Non-member cannot send message', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr')

  const response = await request(app)
    .get('/api/messages/2')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(403)
  expect(response.body.message).toBe('You must be a member of the group')
})

test('Member can list messages', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr')

  const response = await request(app)
    .get('/api/messages/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Returning messages')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Member cannot send message without content', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr')

  const response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', token)
  expect(response.statusCode).toBe(400)
  expect(response.body.message).toBe('You must specify the content of the message')
})

test('Member can send message', async () => {
  const token = await getToken('Sebastien.Viardot@grenoble-inp.fr')

  const response = await request(app)
    .post('/api/messages/1')
    .set('x-access-token', token)
    .send({ content: 'OUI !!!' })
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Message posted')
})
