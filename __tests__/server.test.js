'use strict';

const supertest = require('supertest');
const app = require('../src/server.js').app;
const request = supertest(app);

describe('200. Testing the server with a correct name submission', () => {
  test('Should return a name:key value', async () => {
    let response = await request.get('/person?name=paul');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ name: "paul" });
  });
});

describe('500. Testing the server with no name in query string', () => {
  test('Should return a 500 error', async () => {
    let response = await request.get('/person');

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "No Name. There was no name passed." });
  });
});

describe('404. Testing a bad route', () => {
  test('Should return a 404 error', async () => {
    let response = await request.get('/notaroute');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: "Bad Route. The route is incorrect." });
  });
});

describe('404. Testing a bad METHOD', () => {
  test('Should return a 405 error', async () => {
    let response = await request.put('/person?name=paul');

    expect(response.status).toEqual(405);
    expect(response.body).toEqual({ message: "Method Not Allowed. The requested method is not allowed on this server." });
  });
});
