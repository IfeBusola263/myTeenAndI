import dbClient from '../utils/db';
import Comment from './comment';

const postSchema = new dbClient.mongoose.Schema(
    {
	text: String,
	likes: Number,
	comments: [dbClient.mongoose.model('Comment').schema],
	date: {
	    type: Date,
	    default: Date.now
	}
    });

module.exports = dbClient.mongoose.model('Post', postSchema);
