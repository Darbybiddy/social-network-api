const router = require('express').Router()
const{
getAllUsers,
getUsersById,
createUsers,
updateUsers,
deleteUsers
} = require('../../controllers/user-controller')

//set up GET all and POST at /api/pizzas
router
.route('/')
.get(getAllUsers)
.post(createUsers)

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

module.exports = router;