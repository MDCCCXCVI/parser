var ServiceController = require('../controllers/service');
var StoriesController = require('../controllers/stories');
var MostPopularController = require('../controllers/trending');

module.exports = function (app, express) {
  var api = express.Router();

  api.get('/service', ServiceController.getService);
  api.post('/service', ServiceController.setService);

  api.get('/real_stories', StoriesController.getRealTestTopStories);

  api.get('/trending', MostPopularController.getTrendingStories);

  api.get('/me', function (req, res) {
    res.send(req.decoded);
  });
  return api;
};