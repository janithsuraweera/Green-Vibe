const express = require("express");
const dbConnection = require("./config/db");
const routes = require("./routes/employees");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: true, credentials: true }));

dbConnection();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello world"));
app.use("/api/employees", routes);

// Start the server on port 9001.
const PORT = 9001;

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));