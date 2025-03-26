module.exports = {
  async method({ arg }) {
    return { status: 'ok', arg };
  },
};
