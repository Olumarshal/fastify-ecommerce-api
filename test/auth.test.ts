import { expect } from 'chai';
import app from '../src/app';
import { describe, it, before } from 'mocha';

describe('Auth Routes', () => {
  let server: any;

  before(async () => {
    server = app;
    await server.ready();
  });

  it('should register a new user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/register',
      payload: {
        username: 'testuser',
        password: 'testpassword'
      }
    });

    expect(response.statusCode).to.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.have.property('token');
  });

  it('should login an existing user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'testuser',
        password: 'testpassword'
      }
    });

    expect(response.statusCode).to.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.have.property('token');
  });
});
