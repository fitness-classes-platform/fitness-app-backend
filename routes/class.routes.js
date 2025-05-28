const express = require("express");
const router = express.Router();

const Class = require("../models/Class.model")

const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

router.get("/class", (req, res, next) => {
  Class.find()
    .populate("reviews")
    .then((classes) => {
      res.status(200).json(classes)
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" })
      next(error);
    })
});

router.post("/class", fileUploader.single("image"), (req, res, next) => {
  const { name, location, schedule, difficulty, contacts } = req.body;

  const newClass = {
    name,
    location,
    schedule,
    difficulty,
    contacts,
    image: req.file?.path || ""
  };

  Class.create(newClass)
    .then((createdClass) => {
      res.status(201).json(createdClass);
    })
    .catch((error) => {
      console.error("Error creating new class", error);
      res.status(500).json({ message: "Error creating new Class" });
      next(error);
    });
});


router.delete("/class/:classId", isAuthenticated, (req, res, next) => {
  const { classId } = req.params;

  Class.findByIdAndDelete(classId)
    .then((deleteClass) => {
      res.status(204).json(deleteClass)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error deleting class" })
      next(error);
    })
})

router.get("/class/:classId", (req, res, next) => {
  const { classId } = req.params;

  Class.findById(classId)
    .populate("reviews")
    .then((findClass) => {
      res.status(200).json(findClass)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error displaying class" })
      next(error);
    })
})

router.put("/class/:classId", isAuthenticated, fileUploader.single("image"), (req, res, next) => {
  const { classId } = req.params;
  const newDetails = req.body;

  if (req.file?.path) {
    newDetails.image = req.file.path;
  }

  Class.findByIdAndUpdate(classId, newDetails, { new: true })
    .then((updatedClass) => {
      res.status(200).json(updatedClass);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error updating class" });
      next(error);
    });
});


module.exports = router;