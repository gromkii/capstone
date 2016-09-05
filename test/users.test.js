var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');

// Start writing tests.
describe('User API Calls', ()=>{
  it('Should return list of users.', done => {
    request
      .get('/api/users/')
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
})
