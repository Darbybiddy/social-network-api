const router = require('express').Router()
const{
getAllThoughts,
getThoughtById,
createThought,
updateThought,
deleteThought,
createReaction,
removeReaction
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought)

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  //:thoughtId/reactions
  router
  .route('/:thoughtId/reactions')
  .post(createReaction)

  router
  .route(':thoughtId/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router;