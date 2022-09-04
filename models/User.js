const { Schema, model } = require('mongoose');

//User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: 'You need to provide a username!',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'You need to provide an email address!',
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    thoughts: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type:Schema.Types.ObjectId,
            //self reference
            ref: 'User'  
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
            //we set id to false because this is a virtual that Mongoose returns, and we don’t need it.
            id: false
        }
    }
);

//counts how many friends a user has
UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

//create the User model using the User Schema
const User = model('User', UserSchema);

//export the User model
module.exports = User;
