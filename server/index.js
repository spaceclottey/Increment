const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// create a GET route
app.get("/api", (req, res) => {
  res.send({ message: "I've won, excactly as planned" });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => {
  console.log(`Server listening on ${port}, Space`);
});
