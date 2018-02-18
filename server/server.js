var express = require("express");
var path = require("path");
var port = process.env.port || 3939;

var app = express();
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, (err) => {
    console.log(`chimart server listening at http://localhost:${port}`);
});