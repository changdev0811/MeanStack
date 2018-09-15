const express = require("express");
const multer = require("multer");

const Car = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const car = new Car({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    car.save().then(createdCar => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdCar,
          id: createdCar._id
        }
      });
    });
  }
);

router.get("", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Car.find({ creator: req.userData.userId });
  let fetchedCars;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedCars = documents;
      return Car.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        cars: fetchedCars,
        maxCars: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  console.log("AAAA")
  Car.findById({ _id: req.params.id }).then(car => {
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Car.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Car deleted!" });
  });
});

module.exports = router;
