const { Thought, User } = require('../models');

const thoughtController = {
    //routes to get all thoughts
    getAllThought(req, res){
        Thought.find({})
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //get single thought by its id
    getThoughtById({ params}, res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a new thought
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                //adds thought to the specific user id we're wanting to add a thought to
                {$push: {thoughts: _id}},
                //receives back the new updated user with the thought associated
                {new: true}
            )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    //add a reaction to a thought
    addReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.id},
            { $push: {reactions: body}},
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with that id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    //update a single thought by its id
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


    //remove single thought by its id
    removeThought({ params }, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //remove reaction
    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            {_id: params.id},
            { $pull: {reactions: params.reactionId}},
            { new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with that id!'});
                return;
            };
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;