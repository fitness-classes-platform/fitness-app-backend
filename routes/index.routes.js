const express = require("express");
const router = express.Router();

const Class = require("../models/Class.model")
const Review = require("../models/Review.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// Class routes

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

router.post("/class", (req, res, next) => {
  const newClass = req.body;

  Class.create(newClass)
    .then((newClass) => {
      res.status(201).json(newClass)
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating new Class" })
      next(error);
    })
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

router.put("/class/:classId", isAuthenticated, (req, res, next) => {
  const { classId } = req.params;
  const newDetails = req.body;

  Class.findByIdAndUpdate(classId, newDetails, { new: true })
    .then((updateClass) => {
      res.status(200).json(updateClass)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error updating class" })
      next(error);
    })

})

// Review Routes
router.get("/review/class/:classId", (req, res, next) => {
  Review.find()
    .then((reviews) => {
      res.status(200).json(reviews)
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" })
      next(error);
    })
});

router.post("/review/class/:classId", isAuthenticated, (req, res, next) => {
  const { classId } = req.params;
  const { title, description, ranking } = req.body;

 
  Review.create({ title, description, ranking })
    .then((newReview) => {
      return Class.findByIdAndUpdate(
        classId,
        { $push: { reviews: newReview._id } },
        { new: true }
      ).populate("reviews");
    })
    .then((updatedClass) => {
      res.status(201).json(updatedClass);
    })
    .catch((error) => {
      console.error("Error adding review:", error);
      res.status(500).json({ error: "Failed to add review" });
    });
});

/*router.delete("/review/:reviewId", isAuthenticated, (req, res, next) => {
  const {reviewId} = req.params;

Review.findByIdAndDelete(reviewId)
  .then((deleteReview)=>{
    res.status(204).json(deleteReview)
  })
  .catch((error) => {
    res.status(500).json({ error: "Error deleting review" })
    next(error);
  })
})*/

router.get("/review/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .then((findReview) => {
      res.status(200).json(findReview)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error displaying review" })
      next(error);
    })
})

/*router.put("/review/:reviewId", isAuthenticated, (req, res, next) => {
  const {reviewId} = req.params;
  const newDetails= req.body;

  Review.findByIdAndUpdate(reviewId, newDetails, {new:true})
  .then((updateReview)=>{
    res.status(200).json(updateReview)
  })
  .catch((error) => {
    res.status(500).json({ error: "Error updating review" })
    next(error);
  })

})*/



module.exports = router;
