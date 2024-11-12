const req = require('supertest');
const app = require('../../app');

describe('Test GET /launches', function () {
  test('It should respond with 200 ok', async () => {
    const res = await req(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', function () {
  const testBody = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028',
  };
  const { launchDate, ...testBodyWithoutDate } = testBody;

  test('It should respond with 201 created', async () => {
    const res = await req(app)
      .post('/launches')
      .send(testBody)
      .expect('Content-Type', /json/)
      .expect(201);

    const reqDate = new Date(launchDate).valueOf();
    const resDate = new Date(launchDate).valueOf();

    expect(res.body).toMatchObject(testBodyWithoutDate);
    expect(resDate).toBe(reqDate);
  });

  test('It should catch missing required props', async () => {
    const res = await req(app)
      .post('/launches')
      .send(testBodyWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toStrictEqual({
      error: 'Bad Request! Check the response body',
    });
  });

  test('It should catch invalid date prop', async () => {
    const res = await req(app)
      .post('/launches')
      .send({
        ...testBody,
        launchDate: 'this is not a date value xd',
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toStrictEqual({
      error: 'Invalid date given to the request body',
    });
  });
});

describe('Test DELETE /launches/:id', function () {
  const trueId = 100;
  const fakeId = 107;

  test(`It should abort the mission that has the flight number of ${trueId}`, async () => {
    const res = await req(app)
      .delete(`/launches/${trueId}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test(`It should deny the abort signal because we do not have any mission that has the flight number of ${fakeId}`, async () => {
    const res = await req(app)
      .delete(`/launches/${fakeId}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(res.body).toStrictEqual({
      error: 'Launch not found, wrong id',
    });
  });
});
