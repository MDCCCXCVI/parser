var fs = require('fs');
var path = require('path');

module.exports = {

  getService: function (req, res) {
    fs.readFile(path.resolve(__dirname, "./assets/service.json"), "utf8", function (err, data) {
      if (err) throw err;

      res.json(JSON.parse(data));
    });
  },

  setService: function (req, res) {
    var updateString = JSON.stringify({ service: req.body.serviceName });
    // persist service
    fs.writeFile(path.resolve(__dirname, "./assets/service.json"), updateString, (err, data) => {
      if (err) return res.json({ error: 'Could not find file ./assets/service.json' });
      res.json({ success: "File updated!" });
    });
  }

}