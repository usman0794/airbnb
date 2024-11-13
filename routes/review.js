const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post Review Route
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewid",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
