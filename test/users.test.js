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

describe('Session API Calls', ()=>{
  before(done => {
    knex.migrate.latest().then(()=>{
      knex.seed.run().then(()=> {
        done();
      })
    });
  });

  after(done => {
    knex.migrate.rollback().then(()=>{
      done()
    });
  });

  it('Should return session all sessions.', done => {
    request
      .get('/api/sessions')
      .expect(200)
      .end((err, res) => {
        var sessions = res.body;
        expect(sessions.length).to.eq(3) // Current seed only has one session!
        expect(sessions[0].users.length).to.eq(3) // First session has 3 users.
        done();
      });
  });

  it('Should post a new session.', done => {
    var n = {
      session_name:'A Game',
      game_name:'Shadowrun',
      session_desc:'A Game',
      header_url:'fillmurray.com/900/200',
      start_date:'2016-09-07T18:25:49+00:00',
      runtime:'forever',
      skill_level:2,
    }

    request
      .post('/api/sessions')
      .send(n)
      .expect(200)
      .end((err, res) => {
        request
          .get('/api/session/4')
          .expect(200)
          .end((err, res) => {
            var s = res.body;
            expect(s.game_name).to.eq('Shadowrun');
            done();
          })
      })
  });

  it('Should return specific session information.', done => {
    request
      .get('/api/session/1')
      .expect('200')
      .end((err, res) => {
        var s = res.body;
        expect(s.session_name).to.eq('Fill Murray Hack n Slash');
        expect(s.game_name).to.eq('Dungeons and Dragons');
        expect(s.skill_level).to.eq(1);
        done();
      })
  })

  it('Should return sessions users.', done => {
    request
      .get('/api/session/1')
      .expect(200)
      .end((err, res) => {
        var s = res.body;
        expect(s.users.length).to.eq(3);
        done();
      })
  })
});
