'use strict';

// const supertest = require('supertest');
// const start = require('../src/server.js').start;
// const app = require('../src/server.js').app;
// const request = supertest(app);
const { app, start } = require('../src/server.js');
const supertest = require('supertest');
//const app = require('../src/server.js');
const request = supertest(app);

// Rest of your test code


const validURLRegex = /^(ftp:\/\/|http:\/\/|https:\/\/)[^ "]+$/;
const invalidURLRegex = /^(?!ftp:\/\/|http:\/\/|https:\/\/)[^ "]*$/;

const validStrings = [
  'http://example.com',
  'https://www.example.com',
  'ftp://ftp.example.com',
];

const invalidStrings = [
  'example.com',
  'www.example.com',
  'http://example',
  'http://.com',
  'http://example.com/',
];

describe('Valid URLs', () => {
  test('valid URL 1', () => {
    expect(validURLRegex.test(validStrings[0])).toBe(true);
  });

  test('valid URL 2', () => {
    expect(validURLRegex.test(validStrings[1])).toBe(true);
  });

  test('valid URL 3', () => {
    expect(validURLRegex.test(validStrings[2])).toBe(true);
  });
});

describe('Invalid URLs', () => {
  test('invalid URL 1', () => {
    expect(invalidURLRegex.test(invalidStrings[0])).toBe(true);
  });

  test('invalid URL 2', () => {
    expect(invalidURLRegex.test(invalidStrings[1])).toBe(true);
  });

  test('invalid URL 3', () => {
    expect(invalidURLRegex.test(invalidStrings[2])).toBe(false);
  });

  test('invalid URL 4', () => {
    expect(invalidURLRegex.test(invalidStrings[3])).toBe(false);
  });

  test('invalid URL 5', () => {
    expect(invalidURLRegex.test(invalidStrings[4])).toBe(false);
  });
});


describe('app.js', () => {
  it('should start the Express server', (done) => {
    const mockListen = jest.fn();
    app.listen = mockListen;

    const port = 3000;

    start(port);

    expect(mockListen).toHaveBeenCalledWith(port, expect.any(Function));
    done();
  });

  // describe('POST /queryvideo', () => {
  //   it('should handle a valid /queryvideo request', async (done) => {
  //     const response = await request
  //       .post('/queryvideo')
  //       .send({ query: '2 sentence summary', youtubeURL: 'https://youtu.be/bZQun8Y4L2A'});

  //     //console.log('THE RESPONSE:', response);
  //     //console.log('THE MESSAGE:', message);
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBeDefined();
  //     done();
  //   });

    // it('should handle a /queryvideo request with an unsupported video', async (done) => {
    //   const response = await request(app)
    //     .post('/queryvideo')
    //     .send({ query: 'example query', youtubeURL: 'unsupported URL' });

    //   expect(response.statusCode).toBe(500);
    //   expect(response.text).toBe('Sorry, this video does not support transcript. Please try another video');
    //   done();
    // });

  //   it('should handle a /queryvideo request with an error', async (done) => {
  //     // Mock handleQuery to throw an error
  //     jest.mock('./queryvideo.js', () => {
  //       return {
  //         __esModule: true,
  //         default: async () => {
  //           throw new Error('Test error');
  //         },
  //       };
  //     });

  //     const response = await request(app)
  //       .post('/queryvideo')
  //       .send({ query: 'example query', youtubeURL: 'example URL' });

  //     expect(response.statusCode).toBe(500);
  //     expect(response.text).toBe('Test error');
  //     done();
  //   });
  // });

  // it('should use the logger middleware', async (done) => {
  //   const loggerMiddleware = jest.fn((req, res, next) => {
  //     next();
  //   });

  //   app.use(loggerMiddleware);

  //   await request(app).get('/queryvideo'); // Send a GET request to trigger the middleware

  //   expect(loggerMiddleware).toHaveBeenCalled();
  //   done();
  // });

});

