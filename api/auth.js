module.exports = {
  async signin({ login, password }) {
    return { status: 'ok', login, password };
  },

  async signout() {
    return { status: 'ok' };
  },
};
