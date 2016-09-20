var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');

describe('Session API Calls', () => {
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

  it('Should return a list of all sessions.', done => {
    request
      .get('/api/sessions')
      .expect(200)
      .end((err, res) => {
        var s = res.body;
        expect(s.length).to.eq(3);
        done();
      });
  });

  it('Should create a new session.', done => {
    var n = {
      session_name:'Test',
      game_name:'Another Test',
      session_desc:'Testing posting an new session.',
      start_date:'2016-09-07T18:25:49+00:00',
      runtime:'4-5 Hours',
      skill_level:1,
      host_id:1,
      num_players:4
    }

    request
      .post('/api/sessions')
      .expect(200)
      .send(n)
      .end((err, res) => {
        request
          .get('/api/sessions')
          .expect(200)
          .end((err, res) => {
            var s = res.body;
            expect(s.length).to.eq(4);
            expect(s[3].session_name).to.eq('Test')
            done();
          })
      })
  })
})
