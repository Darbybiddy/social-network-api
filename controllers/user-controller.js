const { Thought, User } = require("../models");
const { getAllThoughts } = require("./thought-controller");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find()
    .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //get one user by id
  getUsersById({ params }, res) {
    User.findOne({ _id: params.userId })
    .select("-__v")
    .populate('friends')
    .populate('thoughts')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUsers(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update user by id
  updateUsers(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete pizza
  deleteUsers(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $push: {
          friends: {
            _id: params.friendsId
          },
        },
      },
      { new: true },
      { runValidators: true }
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "no user found with this id" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err))
    );
  },

  removeFriend({ params }, res) {
    User.findOneAndDelete(
      { _id: params.userId },
      { $pull: {friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No User with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },

};

module.exports = userController;
