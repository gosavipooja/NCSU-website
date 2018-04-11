var express = require('express');

var server = express();

server.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 5000;

server.listen(port, function () {
    console.log('server started... listening on port ' + port);
});