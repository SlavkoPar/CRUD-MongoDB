let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let categorySchema = require("../models/Category");

// CREATE Category
router.post("/create-category", (req, res, next) => {
    categorySchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

// READ Categories
router.get("/", (req, res, next) => {
    categorySchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// UPDATE Category
router
    .route("/update-category/:id")
    // Get Single Category
    .get((req, res, next) => {
        categorySchema.findById(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
    })

    // Update Category Data
    .put((req, res, next) => {
        categorySchema.findByIdAndUpdate(
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
                    console.log("Category updated successfully !");
                }
            }
        );
    });

// Delete Category
router.delete("/delete-category/:id",
    (req, res, next) => {
        categorySchema.findByIdAndRemove(
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
