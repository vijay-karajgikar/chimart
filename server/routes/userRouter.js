const express = require("express");
const userRouter = express.Router();
const userSchema = require("../models/User");
const bcryptNode = require("bcrypt-nodejs");


userRouter.post("/register", (req, res) => {

    userSchema.findOne({email: req.body.email}, (err, user) => {

        if (err) {
            return res.send({"success": false, "message": "User not found"});
        } else {

            if (user) {
                return res.send({"success": false, "message": "User already exists"});
            } else {

                const newUser = new userSchema();
                newUser.email = req.body.email;
                newUser.name = req.body.name;
                newUser.location = req.body.location;
                bcryptNode.hash(req.body.password, null, null, (err, hash) => {

                    if (err) {
                        return res.send({"success": false, "message": "Error getting the hash for the password"});
                    } else {
                        newUser.password = hash;
                    }

                });

                userSchema.create(newUser, (err, newUser) => {
                    if (err) {
                        return res.send({"success": false, "message": "Error creating a new user"});
                    } else {
                        return res.send({"success": true, "message": "User registered successfully"});
                    }

                });
                
            } // (user) else

        } // (err) else

    });
});


userRouter.post("/login", (req, res) => {    
    userSchema.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log(err);
            return res.send({"success": false, "message": "Error validating the user"});
        } else {

            bcryptNode.compare(req.body.password, user.password, (err, res) => {

                if (err) {                    
                    return res.send({"success": false, "message": "User authentication not successful"});
                } 
            });
            user.password = undefined;
            return res.send({"success": true, "message": "User authentication successful", "user": user});
        }
    });
});

userRouter.post("/delete", (req, res) => {
    console.log(req.body.email);

    userSchema.remove({email: req.body.email}, (err, res) => {
        if (err) {
            console.log(err);
            return res.send({"success": false, "message": "Error deleting the user"});
        }        
    });

    console.log("remove call successful");            
    return res.send({"success": true, "message": "User deleted"});

});

module.exports = userRouter;