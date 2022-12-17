const { Thought, User } = require("../models");
const { db } = require("../models/User");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  //update thought
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "no thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete pizza
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  //create reactions
  createReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: body.reactionBody,
            username: body.username,
          },
        },
      },
      { new: true },
      { runValidators: true }
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "no thought found with this id" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err))
    );
  },

  removeReaction({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.ThoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
// getAllThoughts,
// getThoughtById,
// createThoughts,
// updateThoughts,
// deleteThoughts
