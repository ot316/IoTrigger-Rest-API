exports.trimlist = function (req, res, trimlist) {
    body = '';
    
    req.on('data', function (chunk) {
        body += chunk;
    });
    
    req.on('end', function () {
        postBody = JSON.parse(body);
        var lines = trimlist.split(/\r?\n/);
        var version = lines[0].match(/\d+/)[0];
        lines.splice(0,2);
        try {
            var clientVersion = postBody.version
            if (clientVersion < version) {
                var response = {
                    "version": version,
                    "trimlist": lines
                }
            }
            else {
                var response = {
                    "version": version,
                    "trimlist": null
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