// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app.js');
const { User } = require('../models/index.js');

describe('Auth module', () => {
  let testEmail;
  let testUserId;

  beforeAll(() => {
    const now = Date.now();
    testEmail = `test${now}@example.com`;
  });

  afterAll(async () => {
    if (testUserId) {
      await User.destroy({ where: { id: testUserId } });
    }
  });

  it('register -> login -> me', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: testEmail,
        emailConfirm: testEmail,
        password: '123456',
        passwordConfirm: '123456',
        role: 'estudiante'
      })
      .expect(201);

    expect(registerRes.body.token).toBeDefined();
    const { token: registerToken } = registerRes.body;

    const payload = JSON.parse(
      Buffer.from(registerToken.split('.')[1], 'base64').toString()
    );
    testUserId = payload.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '123456' })
      .expect(200);

    expect(loginRes.body.token).toBeDefined();
    const loginToken = loginRes.body.token;

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginToken}`)
      .expect(200);

    expect(meRes.body.user.email).toBe(testEmail);
    expect(meRes.body.user.id).toBe(testUserId);
    expect(meRes.body.user.role).toBe('estudiante');
  });
});
