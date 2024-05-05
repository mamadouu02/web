const app = require('../app')
const request = require('supertest')

test('Group not found', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups/0')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(404)
  expect(response.body).toHaveProperty('message', 'The group does not exist')
})

test('User not found', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups/1/0')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(404)
  expect(response.body).toHaveProperty('message', 'The user does not exist')
})

test('Admin can list groups', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Non-admin can list groups', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sylvain.Bouveret@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
})

test('User cannot create a group without name', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .post('/api/mygroups')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'You must specify the name')
})

test('User can create a group', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .post('/api/mygroups')
    .set('x-access-token', response.body.token)
    .send({ name: 'GroupThree' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Group added')
})

test('User can list members', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups/1')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning members')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test('Non-admin, non-owner or non-member cannot list members', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sylvain.Bouveret@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/mygroups/3')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'You must be the owner/a member of the group or admin')
})

test('Admin or owner can add a member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .put('/api/mygroups/3/2')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Member added')
})

test('Admin or owner cannot add an existing member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .put('/api/mygroups/3/2')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'The member is already in group')
})

test('Admin or owner can delete another member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .delete('/api/mygroups/3/2')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Member deleted')
})

test('Admin or owner cannot delete an unexisting member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .delete('/api/mygroups/3/2')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(400)
  expect(response.body).toHaveProperty('message', 'The member is not in group')
})

test('Member cannot delete another member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sylvain.Bouveret@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .delete('/api/mygroups/1/3')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'Member cannot delete another member')
})

test('Admin or owner can delete a group', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .delete('/api/mygroups/3')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Group deleted')
})

test('Non-admin or non-owner cannot delete a group', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sylvain.Bouveret@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .delete('/api/mygroups/1')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(403)
  expect(response.body).toHaveProperty('message', 'You must be the owner of the group or admin')
})

test('User can list groups in which he is a member', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')

  response = await request(app)
    .get('/api/groupsmember')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('message', 'Returning groups')
  expect(response.body.data.length).toBeGreaterThan(0)
})
