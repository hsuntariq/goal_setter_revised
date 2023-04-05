const express = require('express');
const { getGoals, postGoals, updateGoals, deleteGoals } = require('../controllers/goalController');
const { protect } = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.get('/',protect, getGoals);
router.post('/',protect,postGoals);
router.put('/:id',protect, updateGoals);
router.delete('/:id',protect, deleteGoals)

module.exports = router;