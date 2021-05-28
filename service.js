exports.trimlist = function (req, res, iotrim) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        postBody = JSON.parse(body);
        try {
            var response = {
                "Version": postBody.version,
                "Device Types": postBody.deviceTypes, 
                "trimlist": iotrim           
            };

        } catch (error) {
            response = "Invalid Request";
            console.error(response);
            console.error(error);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};