const express = require('express')
const {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteworkout,
    updateWorkout
} = require('../controllers/workoutController')
const router = express.Router()

//GET ALL
router.get('/', getAllWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DeLETE a workout
router.delete('/:id', deleteworkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router
