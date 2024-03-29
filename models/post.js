import dbClient from '../utils/db';
import Comment from './comment';

const postSchema = new dbClient.mongoose.Schema(
    {
	username: String,
	body: String,
	likes: {
	    type: Number,
	    default: 0,
	},
	comments: [Comment.schema],
	date: {
	    type: Date,
	    default: Date.now
	}
    });

module.exports = dbClient.mongoose.model('Post', postSchema);
