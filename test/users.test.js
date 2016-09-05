var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');

// Start writing tests.
describe('User API Calls', ()=>{
  before(done => {
    knex.migrate.rollback().then(()=>{
      knex.migrate.latest().then(()=>{
        knex.seed.run().then(()=> {
          done();
        })
      })
    })
  })

  after(done => {
    knex.migrate.rollback().then(()=>{
      done()
    })
  })

  it('Should return array.', done => {
    request
      .get('/api/users/')
      .expect(200)
      .end((err, res) => {
        var users = res.body;
        expect(Array.isArray(users)).to.eq(true);
        expect(users.length).to.eq(3);
        done();
      });
  });
});
