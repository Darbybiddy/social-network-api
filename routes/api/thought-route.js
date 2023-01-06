const router = require('express').Router()
const{
getAllThoughts,
getThoughtsById,
createThoughts,
updateThoughts,
deleteThoughts,
createReaction,
removeReaction
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThoughts)

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

  //:thoughtId/reactions
  router
  .route('/:thoughtId/reactions')
  .post(createReaction)

  router
  .route(':thoughtId/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router;