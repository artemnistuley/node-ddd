
const users = db('users');

({
  async read(id) {
    return users.read(id, ['id', 'login']);
  },

  async create({ login, password }) {
    const passwordHash = await hash(password);
    return users.create({ login, password: passwordHash });
  },

  async update(id, { login, password }) {
    const passwordHash = await hash(password);
    return users.update(id, { login, password: passwordHash });
  },

  async delete(id) {
    return users.delete(id);
  },

  async find(mask) {
    const sql = 'SELECT login from users where login like $1';
    return users.query(sql, [mask]);
  },
});
