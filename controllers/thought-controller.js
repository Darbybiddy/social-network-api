const { Thought, User } = require("../models");

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
  getThoughtById({params},res){
    Thought.findOne({})
  }
};
module.exports = thoughtController
// getAllThoughts,
// getThoughtById,
// createThoughts,
// updateThoughts,
// deleteThoughts
