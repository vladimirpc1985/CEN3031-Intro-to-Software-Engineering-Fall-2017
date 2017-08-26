var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;
/* Global variables */
var listingData, server;

/*
    1. Use the File System module to load `listings.json` into memory. 
*/
fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   listingData = data;

   server.listen(port, function() {
      console.log('server listening on: http://localhost:' + port);
   });
});

/*
  2. Create a request handler with the URL module to send the listing data on a GET request to `localhost:8080/listings`. 
*/
var requestHandler = function(request, response) {
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
  var parsedUrl = url.parse(request.url);

  if(parsedUrl.pathname == '/listings') {
    response.write(listingData);
    response.statusCode = 200;
    response.end();
  } else {
    response.statusCode = 404;
    response.end('Bad gateway error');
  }
};

/*
    3. Use the HTTP module to create a server that makes use of this request handler
*/
server = http.createServer(requestHandler);