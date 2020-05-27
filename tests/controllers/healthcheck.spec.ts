/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

describe('Healthcheck', () => {
  it('returns 200 if server is healthy', async () => {
    const res = await request(app).get('/healtz');
    expect(res.body.status).toBe(200);
    expect(res.body.uptime).toBeGreaterThan(0);
  });
});
