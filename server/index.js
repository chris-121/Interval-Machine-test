const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");

app.use("/api", tasksRoute);

app.listen(4000, () => console.log("Example app listening on port 4000!"));
