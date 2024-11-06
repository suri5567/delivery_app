import request from 'supertest';
import app from '../app.js';

describe('Order API', () => {
  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'John Doe',
        deliveryAddress: '123 Main St',
        totalAmount: 150,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('orderId');
  });
});
