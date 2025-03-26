module.exports = {
  async get() {
    const movies = [
      { title: 'The Godfather', year: 1972 }, 
      { title: 'Goodfellas', year: 1990 },
    ];
    return { status: 'ok', movies };
  },
};
