const express = require("express");
const path = require("path");
const port = process.env.port || 3939;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter");
const config = require("./config");

mongoose.connect(config.db, {
    promiseLibrary: global.Promise
});
var mongoDb = mongoose.connection;
mongoDb.on("error", (err) => {
    console.log("Could not connect to mongo DB at mLab");
    console.log(err);
});

mongoDb.once("open", () => {
    console.log("Connected to MongoDB at mLab");

    const app = express();
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(bodyParser.json());
    
    app.use("/user", userRouter);
   
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.listen(port, (err) => {
        console.log(`chimart server listening at http://localhost:${port}`);
    });
});




