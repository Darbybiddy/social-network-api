const router = require('express').Router()
const{
getAllThoughts,
getThoughtById,
createThoughts,
updateThoughts,
deleteThoughts
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/pizzas
router
.route('/')
.get(getAllThoughts)
.post(createThoughts)

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;