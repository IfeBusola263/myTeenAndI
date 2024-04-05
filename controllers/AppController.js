import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import Post from '../models/post';

export default class AppController {
  static homePage(req, res) {
    res.status(200).json({ success: 'We are Live' });
  }

  static getStatus(req, res) {
    if (redisClient.isActive() && dbClient.isActive()) res.status(200).json({ status: 'ok' });
  }

    static async allPosts(req, res){
	const token = req.get("X-Token");
	const userRedisKey = `auth_${token}`;
	const userID = await redisClient.get(userRedisKey);

	if (!userID) {
	    res.status(401).json({error: "unauthorized"});
	    return;
	}

	const allPosts = await Post.find().lean().exec();

	allPosts.forEach((post) => {
	    delete post.__v;
	    const { _id, ...rest} = post;
	    return { id: _id, ...rest};
	});
	res.set('X-Token', token);
	console.log(allPosts);
	res.status(200).json(allPosts);
	
    }
}
