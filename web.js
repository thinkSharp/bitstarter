var express = require('express');
var fs = require('fs');
var filename = "index.html";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
fs.exists(filename,function(exists) {
  if (exists) {
    fs.stat(filename, function(error,stats) {
       fs.open(filename, "r", function(error, fd) {
          var buffer = new Buffer(stats.size);
          fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead,buffer) {
             var data = buffer.toString("utf8", 0, buffer.length);
             response.send(data);
             fs.close(fd);
          });        
       });
    }); 
 }
}); 
response.send('Hello World2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
