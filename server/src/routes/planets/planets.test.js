const req = require('supertest');
const app = require('../../app');

describe('Test GET /planets', function () {
  test('It should respond with 200 ok', async () => {
    const res = await req(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
