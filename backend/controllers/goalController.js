const AsyncHandler = require('express-async-handler');
const Goals = require('../models/Goals');
// get the goals
const getGoals = AsyncHandler(async (req, res) => {
    if (req.user.role === 1) {
        let goal = await Goals.find();
        res.status(200).json(
        goal
    );
    }
    let goal = await Goals.find({user:req.user.id});
    res.status(200).json(
        goal
    );
});
// post the goal
const postGoals = AsyncHandler(async(req, res) => {
    
    if (!req.body.goal) {
        res.status(400);
        throw new Error('Please add all the fields')
    }
    const goal = await Goals.create({
        goal: req.body.goal,
        user:req.user.id,
    })
    res.status(200).json({
        goal
    })
})

// update the goal

const updateGoals = AsyncHandler(async (req, res) => {
    // check if the specific goal exists
    let goal = await Goals.findById(req.params.id);
    if (!goal) {
        res.status(404);
        throw new Error('Cant find the goal')
    }
    let updateGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updateGoal);
})

const deleteGoals = AsyncHandler(async (req, res) => {
    const deletedGoal = await Goals.findById(req.params.id);
    if (!deletedGoal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    await deletedGoal.deleteOne();
    res.status(200).json({
        _id: deletedGoal.id,
    })
})


module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}