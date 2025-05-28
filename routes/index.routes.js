const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Class = require("../models/Class.model")
const Review = require("../models/Review.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");


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







// Review Routes
router.get("/review/class/:classId", (req, res, next) => {
  Review.find()
    .populate("author")
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
  const { title, description, ranking, image } = req.body;

  Review.create({ title, description, ranking, image, author: req.payload._id})
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



router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});




router.delete("/review/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;

  Review.findByIdAndDelete(reviewId)
    .then((deleteReview) => {
      res.status(204).json(deleteReview)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error deleting review" })
      next(error);
    })
})

router.get("/review/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .populate("author")
    .then((findReview) => {
      res.status(200).json(findReview)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error displaying review" })
      next(error);
    })
})

router.put("/review/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;
  const newDetails = req.body;

  Review.findByIdAndUpdate(reviewId, newDetails, { new: true })
    .then((updateReview) => {
      res.status(200).json(updateReview)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error updating review" })
      next(error);
    })

})

router.get('/health', (req, res) => {
  // send ping to prevent inactivity on mongodb atlas
  mongoose.connection.db.admin().ping()
    .then( () => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    })
    .catch(err => {
      console.error('MongoDB ping failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to connect to MongoDB',
      });
    });
});

module.exports = router;
