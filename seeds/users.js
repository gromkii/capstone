
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'fmurray',
          email:'email@mail.com',
          avatar_url:'http://fillmurray.com/200/200',
          full_name:'Fill Murray',
          password:'$2a$08$HW7PiPKHDQU.8GMpSf2ZpelzDSA533KaFmlXyxWqOP1ZJMmHtkDvu',
          location:'Austin, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
        knex('users').insert({
          username: 'pcage',
          email:'email@mail.com',
          avatar_url:'http://placecage.com/200/200',
          full_name:'Place Cage',
          password:'$2a$08$HW7PiPKHDQU.8GMpSf2ZpelzDSA533KaFmlXyxWqOP1ZJMmHtkDvu',
          location:'Houston, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
        knex('users').insert({
          username: 'ssegallery',
          email:'email@mail.com',
          avatar_url:'http://stevensegallery.com/200/200',
          full_name:'Steven Segallery',
          password:'$2a$08$HW7PiPKHDQU.8GMpSf2ZpelzDSA533KaFmlXyxWqOP1ZJMmHtkDvu',
          location:'Dallas, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
      ]);
    }).then(() => {
      return knex('user_roles').del()
        .then(() => {
          return Promise.all([
            knex('user_roles').insert({
              id:1,
              role:'admin'
            }),
            knex('user_roles').insert({
              id:2,
              role:'moderator'
            }),
            knex('user_roles').insert({
              id:3,
              role:'user'
            })
          ]);
        });
    }).then(() => {
      return knex('user_groups').del()
        .then(() => {
          return Promise.all([
            knex('user_groups').insert({
              user_id:1,
              role_id:1
            }),
            knex('user_groups').insert({
              user_id:2,
              role_id:2
            }),
            knex('user_groups').insert({
              user_id:3,
              role_id:2
            })
          ]);
        });
    });
};
