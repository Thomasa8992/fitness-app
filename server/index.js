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
                var chunks = JSON.parse(fileContents);
                var id = req.params.id;
                var response;
                chunks.forEach(function(chunk) {
                    if (chunk.id === id) {
                        response = chunk;
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
app.route('/api/coach/:type')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var type = req.params.type;
                var response;
                chunks.forEach(function(chunk) {
                    if (chunk.type === type) {
                        response = chunk;
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
app.route("/api/category/:type")
    .get(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var type = req.params.type;
                var response = chunks.filter(function(chunk) {
                    if(chunk.type){
                        if (chunk.type.toLowerCase().trim() === type.toLowerCase().trim()) {
                            return chunk
                        }
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