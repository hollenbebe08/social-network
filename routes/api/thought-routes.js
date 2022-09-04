const router = require('express').Router();
const { getAllThought, getThoughtById, addThought, updateThought, removeThought } = require('../../controllers/thought-controller');

//set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(addThought)

//callback to find a thought by id and either update/remove the thought
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

//set up callback to add a reaction/delete a reaction by id


module.exports = router;