const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//reaction Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionsBody: {
            type: String,
            required: true,
            trim: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
);

//Thought Schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please let us know your thoughts!',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //this is for the user that created this thought
    username: {
        type: String,
        required: true
    },
    //use ReactionsSchema to validate data for reactions
    reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
