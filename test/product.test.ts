import { expect } from 'chai';
import app from '../src/app';
import { describe, it, before } from 'mocha';

describe('Product Routes', () => {
  let server: any;
  let token: string;

  before(async () => {
    server = app;
    await server.ready();
    
    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'testuser',
        password: 'testpassword'
      }
    });

    const body = JSON.parse(response.body);
    token = body.token;
  });

  it('should add a new product', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/products',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        name: 'Test Product',
        description: 'Test Description',
        price: 100
      }
    });

    expect(response.statusCode).to.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.have.property('id');
    expect(body).to.have.property('name', 'Test Product');
  });

  it('should fetch all products', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/products'
    });

    expect(response.statusCode).to.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.be.an('array');
  });
});
