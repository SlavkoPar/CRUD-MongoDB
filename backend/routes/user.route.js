let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let userSchema = require("../models/User");

// CREATE User
router.post("/create-user", (req, res, next) => {
    const { role } = req.body;
    if (role === 'FIRST_REGISTERED_USER_IS_OWNER') {
        req.body.role = 'OWNER';
        // TODO set CreatedBy = _id for OWNER
    }
    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

// READ Users
router.get("/", (req, res, next) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// UPDATE User
router
    .route("/update-user/:id")
    // Get Single User
    .get((req, res, next) => {
        userSchema.findById(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
    })

    // Update User Data
    .put((req, res, next) => {
        userSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            (error, data) => {
                if (error) {
                    console.log(error);
                    return next(error);
                } else {
                    res.json(data);
                    console.log("User updated successfully !");
                }
            }
        );
    });

// Delete User
router.delete("/delete-user/:id",
    (req, res, next) => {
        userSchema.findByIdAndRemove(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.status(200).json({
                        msg: data,
                    });
                }
            });
    });

module.exports = router;
