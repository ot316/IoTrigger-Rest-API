// This script starts the webserver to serve up the latest iotrim trimlist. 
// The server must be restarted to if the list is updated
const http = require('http');
const url = require('url');
const fs = require('fs');

// read server config file
const serverConf = JSON.parse(fs.readFileSync('./server.config', 'utf8'));

// read iotrim trimlist file
const trimlist = fs.readFileSync(serverConf['pathToTrimlist'], 'utf8');

const app = http.createServer((req, res) => {

    var controller = require('./controller.js');
    const reqUrl = url.parse(req.url, true);

    // POST Endpoint
    if (reqUrl.pathname == '/trimlist' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        controller.trimlist(req, res, trimlist);

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        controller.invalidRequest(req, res);

    }
});

// Start Server
const hostname = serverConf["serverAddr"];
const port = serverConf["port"];

app.listen(port, hostname, () => {
	console.log(`Server is running on http://${hostname}:${port}`);
});