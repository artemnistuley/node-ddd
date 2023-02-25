const country = db('country');

({
  async read(id) {
    return country.read(id);
  },

  async find(mask) {
    const sql = 'SELECT * from country where name like $1';
    return country.query(sql, [mask]);
  }
});
