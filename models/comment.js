import dbClient from '../utils/db';

const commentSchema = new dbClient.mongoose.Schema(
  {
    username: String,
    text: String,
    date: {
	type: Date,
	default: Date.now,
    },
  },
);

module.exports = dbClient.mongoose.model('Comment', commentSchema);
