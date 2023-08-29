const Story = require("../Models/storyModel");
const User = require("../Models/userModel");
const { ObjectID } = require("bson");

module.exports.getStory = async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.status(200).json(stories);
};

module.exports.createStory = async (req, res) => {
  const { post } = req.body;

  try {
    const author = req.user.name;
    console.log(author);
    const story = await Story.create({ author, post });
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id) || ObjectID.isValid(req.body.post)) {
    await Story.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          post: req.body.post,
        },
      },
      { upsertedId: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.deleteStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Story.findOneAndRemove({ _id: ObjectID(req.params.id) })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.likeStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id) || ObjectID.isValid(req.body.id)) {
    await Story.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $addToSet: { likers: req.body.id },
      },
      { upsertedId: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "couls not like the document 111" + err });
      });

    await User.findByIdAndUpdate(
      { _id: ObjectID(req.body.id) },
      {
        $addToSet: { likes: req.params.id },
      },
      { upsertedId: true }
    );
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.unlikeStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id) || ObjectID.isValid(req.body.id)) {
    await Story.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $pull: { likers: req.body.id },
      },
      { upsertedId: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "couls not like the document 111" + err });
      });

    await User.findByIdAndUpdate(
      { _id: ObjectID(req.body.id) },
      {
        $pull: { likes: req.params.id },
      },
      { upsertedId: true }
    );
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.commentStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Story.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $push: {
          comments: {
            commenterId: req.body.id,
            commenterPseudo: req.body.name,
            text: req.body.text,
            timestamp: Date.now(),
          },
        },
      }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.editCommentStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    // await Story.findById(
    //   { _id: ObjectID(req.params.id) },
    //   async (err, docs, next) => {
    //     const theComment = await (docs.comments.find((comment) =>
    //       comment._id.equals(req.body.commentId)
    //     ).text = req.body.text);
    //     return docs.save((err) => {
    //       if (!err) return res.status(200).send(docs);
    //       return res.status(500).send(err);
    //     });
    //   }
    // )
    //   .then((docs) => {
    //     res.status(200).json(docs);
    //   })
    //   .catch((err) => {
    //     res.status(docs.status).json({ error: err });
    //   });
    await Story.find(
      {
        _id: ObjectID(req.params.id),
      },
      async (err, docs) => {
        // const theComment = await (docs.comments.find((comment) =>
        //   comment._id.equals(req.body.commentId)
        // ).text = req.body.text);
        // return docs.save((err) => {
        //   if (!err) return res.status(200).send(docs);
        //   return res.status(500).send(err);
        // });
        await docs.findByIdAndUpdate(req.body.commentId, {
          $set: {
            text: req.body.text,
          },
        });
      }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.deleteCommentStory = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Story.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};
