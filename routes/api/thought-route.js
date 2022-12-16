const router = require('express').Router()
const{
getAllThoughts,
getThoughtById,
createThoughts,
updateThoughts,
deleteThoughts,
createReaction,
removeReaction
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/pizzas
router
.route('/')
.get(getAllThoughts)
.post(createThoughts)

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThoughts);

  ///api/thoughts/:thoughtId/reactions
  router
  .route('/:thoughtId/reactions')
  .post(createReaction)

  router
  .route(':thoughtId/reactions/:reactionId')
  .delete('removeReaction')

module.exports = router;