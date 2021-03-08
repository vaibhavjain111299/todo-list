
const express = require("express");
const path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/*", express.static(path.join(__dirname, "public")));
//Server listing
app.listen(process.env.PORT || 8081, (status) => {
    console.log("server is running")
});

