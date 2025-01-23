// models/Feed.js
const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
     
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const Feed = mongoose.model('Feed', FeedSchema);

module.exports = Feed;
