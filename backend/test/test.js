import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const { expect } = chai;

import app from '../dist/index.js';

describe('User API Endpoints', () => {
  let authToken;
  let userId;

  before(async () => {
    // Register a new user and log them in to get a token
    const registerRes = await chai.request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });

    authToken = registerRes.body.token;
    userId = registerRes.body._id;
  });

  after(async () => {
    // Clean up the test user
    await chai.request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should log in an existing user and return a JWT token', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({ email: 'testuser@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should retrieve all users', (done) => {
    chai.request(app)
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should retrieve a single user by ID', (done) => {
    chai.request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id').eql(userId);
        done();
      });
  });

  it('should update a user by ID', (done) => {
    chai.request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Updated Test User' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').eql('Updated Test User');
        done();
      });
  });

  it('should delete a user by ID', (done) => {
    chai.request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').eql(true);
        done();
      });
  });
});
