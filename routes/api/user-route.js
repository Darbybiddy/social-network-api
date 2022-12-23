const router = require('express').Router()
const{
getAllUsers,
getUsersById,
createUsers,
updateUsers,
deleteUsers,
addFriend,
removeFriend
} = require('../../controllers/user-controller')

//set up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUsers)

// Set up GET one, PUT, and DELETE at /api/userId
router
  .route('/:userId')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

// /api/userId/friends/:friendId
router
.route('/:userId/friends')
.post(addFriend)

router
.route('/:userId/friends/:friendId')
.delete(removeFriend)


module.exports = router;