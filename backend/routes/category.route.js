let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

const ObjectId = mongoose.Types.ObjectId


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

const pipeline = [
    {
        $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "fromUsers",
        },
    },
    {
        $lookup:
        {
            from: "users",
            localField: "modifiedBy",
            foreignField: "_id",
            as: "fromUsers2",
        },
    },
    {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    {
                        $arrayElemAt: ["$fromUsers", 0],
                    },
                    {
                        $arrayElemAt: ["$fromUsers2", 0],
                    },
                    "$$ROOT",
                ],
            },
        },
    },
    {
        $project:
        {
            name: 1,
            createdBy_userName: "$userName",
            role: 1,
            created: 1,
            modified: 1,
            modifiedBy_userName: {
                $cond: [
                    {
                        $gt: [
                            {
                                $size: "$fromUsers2",
                            },
                            0,
                        ],
                    },
                    "$fromUsers2",
                    '' //'Unspecified'
                ],
            },
        },
    },
]

// Get Categories
// router.get("/", (req, res, next) => {
//     categorySchema.find((error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.json(data);
//         }
//     });
// });

// Get Categories
router.get('/', async (req, res, next) => {
    categorySchema.aggregate(pipeline, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
})


// Get Single Category
router
    .route("/:id")
    .get((req, res, next) => {
        categorySchema.aggregate([
            {
                $match: {
                    _id: ObjectId(req.params.id),
                }
            },
            ...pipeline
        ], (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data[0]);
            }
        });
    })

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
