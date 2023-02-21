module.exports = {
  getSettings: (req, res) => {
    console.log('hey')
    res.render("settings.ejs");
  },
};
