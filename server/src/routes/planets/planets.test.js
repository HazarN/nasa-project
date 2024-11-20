require('dotenv').config();

const req = require('supertest');
const app = require('../../app');
const utils = require('../../utils/mongo');

describe('Planets API Testing', () => {
  beforeAll(async () => await utils.connectToMongo());

  afterAll(async () => await utils.disconnect());

  describe('Test GET /planets', function () {
    test('It should respond with 200 ok', async () => {
      const res = await req(app)
        .get('/planets')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
