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
  getThoughtById({params},res){
    Thought.findOne({_id:params.thoughtId})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch((err)=> {
        console.log(err)
        res.sendStatus(400)
    })
  },
  //create thought
  createThought({body}, res){
    Thought.create(body)
    .then((dbThoughtData)=>{
        return User.findOneAndUpdate(
            {_id:body.userId},
            {$push: {thoughts: dbThoughtData._id}},
            {new: true}
        )
    }).then((dbUserData)=> res.json(dbUserData))
    .catch(err => res.json(err))
  },
};
module.exports = thoughtController
// getAllThoughts,
// getThoughtById,
// createThoughts,
// updateThoughts,
// deleteThoughts
