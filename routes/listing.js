const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post(
  "/",
  isLoggedin,
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
router.put(
  "/:id",
  isLoggedin,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route
router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
