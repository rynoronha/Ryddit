const app = require("./app");
const http = require("http");

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});

const server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
 const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});
