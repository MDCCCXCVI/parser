(function () {
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var https = require('https');
  var stories = require('../database');

  module.exports = {
    getRealTestTopStories: function (req, res) {
      fs.readFile(path.resolve(__dirname, "./assets/service.json"), "utf8", function (err, data) {
        if (err) throw err;

        var newsObj = JSON.parse(data);
        var service = newsObj.service;

        var options = {
          hostname: 'api.test.bbc.co.uk',
          path: '/content/asset/' + service + '/front_page',
          port: 443,
          method: 'GET',
          headers: {
            'X-Candy-Platform': 'EnhancedMobile',
            'X-Candy-Audience': 'Domestic',
            'Accept': 'application/json'
          },
          key: fs.readFileSync('/etc/pki/certificate.pem'),
          cert: fs.readFileSync('/etc/pki/certificate.pem')
        };

        var strRes = '';

        var request = https.request(options, function (response) {
          response.on('data', function (d) {
            strRes = strRes + d;
          });
          response.on('end', function () {
            var jsonStrRes = JSON.parse(strRes);
            var finalResponse = [];
            jsonStrRes.results[0].groups.forEach(function (type) {
              if (type.items.length) {
                type.items.forEach(function (typeItem) {
                  if (typeItem.summary && typeItem.assetUri && typeItem.headline) {
                    finalResponse.push(typeItem);
                  }
                });
              }
            });
            res.json({ objects: finalResponse.slice(0, 5) });
          });
        });

        request.on('error', function (e) {
          res.json({ error: e });
        });

        request.end()
      });
    },

    getOneThing: function (req, res) {
      var thingId = req.url.split('/')[2];
      thingsAPI(thingId)
        .then(data => {
          res.json(data);
        })
    }
  };
})();