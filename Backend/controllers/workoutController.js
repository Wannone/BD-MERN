const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//GET all
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
//GET one
const getWorkout = async (req, res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'Workout not found'})
        }
        const workouts = await Workout.findById(id)
        if (!workouts) {
            res.status(404).json({error: 'Workout not found'})
        }
        res.status(200).json(workouts)
}

//POST - Create
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//DELETE
const deleteworkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'})
    }
    const workouts = await Workout.findOneAndDelete({_id: id})
    if (!workouts) {
        res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workouts)
}

//UPDATE
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'})
    }

    const workouts = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if (!workouts) {
        res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workouts)
}


module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteworkout,
    updateWorkout
}