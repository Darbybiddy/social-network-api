const router = require('express').Router()
const thoughtRoutes = require('./thought-route')
const userRoutes = require('./user-route')

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/users', userRoutes)
router.use('/thought', thoughtRoutes)

module.exports = router