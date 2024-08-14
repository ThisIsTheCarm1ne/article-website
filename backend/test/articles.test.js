import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const { expect } = chai;

import app from '../dist/index.js';

describe('Article API Endpoints', () => {
  let authToken;
  let articleId;

  before(async () => {
    // Register a new user and log them in to get a token
    const registerRes = await chai.request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });

    authToken = registerRes.body.token;

    // Create a new article
    const articleRes = await chai.request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Test Article', content: 'This is a test article.' });

    articleId = articleRes.body._id;
  });

  after(async () => {
    // Clean up the test article and user
    await chai.request(app)
      .delete(`/articles/${articleId}`)
      .set('Authorization', `Bearer ${authToken}`);

    await chai.request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should create a new article', (done) => {
    chai.request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Another Test Article', content: 'This is another test article.' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should retrieve all articles', (done) => {
    chai.request(app)
      .get('/articles')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should retrieve a single article by ID', (done) => {
    chai.request(app)
      .get(`/articles/${articleId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id').eql(articleId);
        done();
      });
  });

  it('should update an article by ID', (done) => {
    chai.request(app)
      .put(`/articles/${articleId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Updated Test Article' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title').eql('Updated Test Article');
        done();
      });
  });

  it('should delete an article by ID', (done) => {
    chai.request(app)
      .delete(`/articles/${articleId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Article removed');
        done();
      });
  });
});
