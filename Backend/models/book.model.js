const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    reviews: [
      {
        comment: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        username: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
