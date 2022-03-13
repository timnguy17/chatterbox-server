// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/
// var body = [];

// var requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   // console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   // console.log('Boop');


//   // The outgoing status.
//   var statusCode = 200;

//   // See the note below about CORS headers.



//   var headers = defaultCorsHeaders;



//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.
//   headers['Content-Type'] = 'application/json';

//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   // response.writeHead(statusCode, headers);

//   if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
//     console.log('url:', request.url); //use includes/contains?


//   } else{
//     statusCode = 404;
//   }

//   if (request.method === 'GET' && request.url === '/classes/messages') {
//     console.log('url:', request.url); //use includes/contains?
//     response.writeHead(statusCode, headers);
//     response.end();
//   } else

//   if (request.method === 'POST' && request.url === '/classes/messages') {
//     console.log('url:', request.url);
//     request.on('data', (chunk) => {
//       body += chunk;
//     })
//     request.on('end', () => {
//       body = [JSON.parse(body)];
//       console.log('body -> ', JSON.stringify(body));
//       response.writeHead(statusCode, headers);
//       response.end(JSON.stringify(body));
//     });

//   } else {
//     statusCode = 404;
//     response.writeHead(statusCode, headers);
//   }


//   response.end('Hello, World!');

//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   //signals to the server that all of the response headers and body have been sent; that server should consider this message complete

//   //MUST CALL .END ON EACH RESPONSE
//   //what do we call in end?
//   // response.end('Hello, World!');
// };

// // These headers will allow Cross-Origin Resource Sharing (CORS).
// // This code allows this server to talk to websites that
// // are on different domains, for instance, your chat client.
// //

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept, authorization',
//   'access-control-max-age': 10
// };
// // Your chat client is running from a url like file://your/chat/client/index.html,
// // which is considered a different domain.
// //
// // Another way to get around this restriction is to serve you chat
// // client from this domain by setting up static file serving.

// exports.handleReq = requestHandler;
// exports.defaultCorsHeaders = defaultCorsHeaders;



// const http = require('http');

// http.createServer((request, response) => {
//   const { headers, method, url } = request;
//   let body = [];
//   request.on('error', (err) => {
//     console.error(err);
//   }).on('data', (chunk) => {
//     body.push(chunk);
//   }).on('end', () => {
//     body = Buffer.concat(body).toString();
//     // BEGINNING OF NEW STUFF

//     response.on('error', (err) => {
//       console.error(err);
//     });

//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');
//     // Note: the 2 lines above could be replaced with this next one:
//     // response.writeHead(200, {'Content-Type': 'application/json'})

//     const responseBody = { headers, method, url, body };

//     response.write(JSON.stringify(responseBody));
//     response.end();
//     // Note: the 2 lines above could be replaced with this next one:
//     // response.end(JSON.stringify(responseBody))

//     // END OF NEW STUFF
//   });
// }).listen(8080);


// **************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10
};

var storage = [];


var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);


  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';


  if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    console.log('url:', request.url);
    response.writeHead(statusCode, headers);
    response.end('test');

  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    console.log('url:', request.url);
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(storage));

  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    console.log('url:', request.url);
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    });
    request.on('end', () => {
      // body = [JSON.parse(body)];
      body = Buffer.concat(body).toString();
      storage.push(JSON.parse(body));
      console.log('body -> ', body);
      response.writeHead(statusCode, headers);
      response.end(body);
    });
  } else if (request.method === 'GET' && request.url === '/hrcheatcodes') {
    statusCode = 401;
    response.writeHead(statusCode, headers);
    console.log(request.url, 'url', statusCode, 'should be 401');
    response.end('Sorry, Hack Reactor does not allow cheat codes... Goodbye');
  } else if (request.method === 'GET' && request.url === '/coffee/tea') {
    statusCode = 418;
    response.writeHead(statusCode, headers);
    response.end('Bruh, what are you even doing?');
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    console.log( request.url, 'failed');
    response.end('These are not the droids you are looking for...');
  }

};


exports.handleReq = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
