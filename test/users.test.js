var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');

require('locus');

// Start writing tests.
describe('User API Calls', ()=>{
  before(done => {
    knex.migrate.latest().then(()=>{
      knex.seed.run().then(()=> {
        done();
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

  it('Should register a new user.', done => {
    let newUser = {
      username:'placehold',
      email:'test@email.com',
      avatar_url:'placehold.it/250/bada55/ffffff',
      full_name:'Frank Jeff',
      password:'password',
      location:'Austin, TX'
    };

    request
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        request
          .get('/api/users')
          .expect(200)
          .end((err, res) => {
            let users = res.body;
            expect(users.length).to.eq(4);
            done();
          })
      })
  });

  it('Should login as a user.', done => {
    var loginInfo = {
      usernameField:'fmurray',
      passwordField:'test'
    }

    request
      .post('/auth/login')
      .send(loginInfo)
      .expect(302)
      .expect('Location', '/dashboard')
      .end((err, res) => {
        done();
      });
  });
});
