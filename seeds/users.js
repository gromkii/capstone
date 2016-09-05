
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'fmurray',
          email:'email@mail.com',
          avatar_url:'http://fillmurray.com/200/200',
          full_name:'Fill Murray',
          password:'test',
          location:'Austin, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
        knex('users').insert({
          id: 2,
          username: 'pcage',
          email:'email@mail.com',
          avatar_url:'http://placecage.com/200/200',
          full_name:'Place Cage',
          password:'test',
          location:'Houston, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
        knex('users').insert({
          id: 3,
          username: 'ssegallery',
          email:'email@mail.com',
          avatar_url:'http://stevensegallery.com/200/200',
          full_name:'Steven Segallery',
          password:'test',
          location:'Dallas, TX',
          created_at:'2016-09-04T23:59:40+00:00',
          updated_at:'2016-09-04T23:59:40+00:00'
        }),
      ]);
    });
};
