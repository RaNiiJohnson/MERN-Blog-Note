const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    likers: {
      type: [String],
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
