// This script starts the webserver to server up the latest iotrim trimlist
const fs = require('fs');

// read server config file
const conf;

fs.readFile('./server.config', 'utf8', (err, data) => {
	if (err) {console.log(`Error reading server config file from disk: ${err}`)}
	else {conf = data;}
});


// read iotrim trimlist file
const iotrim;

fs.readFile('./iotrim', 'utf8', (err, data) => {
	if (err) {console.log(`Error reading iotrim trimlist file from disk: ${err}`)}
	else {conf = data;}
	});


// Start Server
const serverConf = JSON.parse(data)
const hostname = serverConf["serverAddr"];
const port = serverConf["port"];

const app = require('./controller.js');
trimlist = 'hi'

app.listen(port, hostname, iotrim, () => {
	console.log(`Server is running on http://${hostname}:${port}`);
});