exports.trimlist = function (req, res, trimlist) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        postBody = JSON.parse(body);
        var line = trimlist.split(/\r?\n/);
        var version = line[0].match(/\d+/)[0];
        try {
            var clientVersion = postBody.version
            if (clientVersion < version) {
                var response = {
                    "version": version,
                    "trimlist": trimlist
                }
            }
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