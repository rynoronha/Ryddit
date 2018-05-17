const app = require("./app");
const http = require("http");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
