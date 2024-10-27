const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  Image: {
    type: String,
    default:
      "https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo",
    set: (v) =>
      v === " "
        ? "https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo"
        : v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
