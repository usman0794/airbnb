const express = require("express");
const router = express.Router();

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); //joi
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body.review;

    const review = new Review({ rating, comment });
    await review.save();

    const listing = await Listing.findById(id);
    listing.reviews.push(review._id);
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Review Route

router.delete(
  ":reviewid",
  wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;