import dbClient from '../utils/db';
import Post from './post';

const userSchema = new dbClient.mongoose.Schema(
    {
	name: String,
	email: {
	    type: String,
	    required: true,
	    unique: true
	},
	username: {
	    type: String,
	    required: true,
	    unique: true
	},
	createdAt: {
	    type: Date,
	    immutable: true,
	    default: Date.now
	},
	updatedAt: {
	    type: Date,
	    immutable: true,
	    default: Date.now,
	},
	password: {
	    type: String,
	    required: true,
	    unique: true
	},
	phoneNumber:
	{
	    type: Number,
	    unique: true
	},
	posts: [dbClient.mongoose.model('Post').schema]
    });

module.exports = dbClient.mongoose.model('User', userSchema);
