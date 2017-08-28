var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.route('/api/coach')
    .get(function(req, res) {
        res.sendFile(jsonPath);
    })
app.route('/api/coach/:id')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chirps = JSON.parse(fileContents);
                var id = req.params.id;
                var response;
                chirps.forEach(function(chirp) {
                    if (chirp.id === id) {
                        response = chirp;
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
    
app.listen(3000, function() {
    console.log('Listening on port 3000');
});