const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us <a href=\"https://mail.google.com/\">here</a></h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");

const app = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

    //checks if url is in the routeResponseMap object
    if (routeResponseMap[req.url]) {
        //delays response by 2 seconds
        setTimeout(() => {
            res.end(routeResponseMap[req.url]);
        }, 2000);
    } else {
        res.end("<h1>Page that does not exist!</h1>");
    }
    let body = [];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });

    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);