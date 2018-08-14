var popularStories = require('../database');

module.exports = {
  getTrendingStories: function (req, res) {
    res.json({
      objects: popularStories
    });
  }
}