var http = require('http');


http.createServer(function (req, res) {
    
    // Throw out the fucking favicon
    if(req.url === "/favicon.ico"){
        res.writeHead(200, {"Content-Type" : "image/x-icon"} );
        res.end();
        console.log("favicon requested and fucked the hell out of here");
        return;
    }
    
    // Not the favicon?
    var p = req.url.split("/");
    p.shift();
    
    console.log(p);
    
    if(p.length === 3){
        var a = parseInt(p[1]);
        var b = parseInt(p[2]);
         var result;
        // TODO: switch case met div, mul, sub
        switch (p[0]){
            case "add":
                result = a + b;
                break;
            case "sub":
                result = a - b;
                break;
            case "mul":
                result = a * b;
                break;
            case "div":
                result = a / b;
                break;
                
            default:
                res.writeHead(404, {"Content-Type" : "text/plain"});
                res.end("Page doesn't exist");
        }
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("Result = " + result);
    } else {
        res.writeHead(404);
        res.end("Wrong parameters given");
    }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');