const router = require('express').Router();
const { getAllThought, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

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

//set up callback to add a reaction to a thought
// /api/thought/:thoughtId/reactions
router.route('/:id/reactions')
.post(addReaction);

//set up a callback to delete a reaction from a thought
//api/thought/:thoughtid/reactions/reactionId
router
.route('/:id/reactions/reactionId')
.delete(removeReaction);

module.exports = router;