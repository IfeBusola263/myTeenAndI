import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import User from '../models/user';
import Post from '../models/post';

const { ObjectId } = dbClient.mongoose.Types;

export default class UserController {
  static async getMe(req, res) {
    const token = req.get('X-Token');
    const uName = req.query.username;
    const userRedisKey = `auth_${token}`;
    const userId = await redisClient.get(userRedisKey);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized Operation Please Log in!' });
      return;
    }

    if (!uName) {
      res.status(400).json({ error: 'Username is missing' });
      return;
    }

    const userInfo = await User.findOne({ username: uName }).exec();

    if (!userInfo) {
      res.status(404).json({ error: 'User Not Found' });
      return;
    }

    const {
      name, username, createdAt, email, bio, posts,
    } = userInfo;
    res.set('X-Token', token);
    res.status(200).json({
      name, username, createdAt, email, bio, posts, token,
    });
  }

  static async getPosts(req, res) {
    const token = req.get('X-Token');
    const { username } = req.query;
    const userRedisKey = `auth_${token}`;
    const userId = await redisClient.get(userRedisKey);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userInfo = await User.findOne({ username }).exec();
    if (userInfo.posts.length === 0) {
      res.status(200).json({ success: 'No Posts' });
      return;
    }

    res.status(200).json(userInfo.posts);
  }

  static async newPost(req, res) {
    const token = req.get('X-Token');
    const userRedisKey = `auth_${token}`;
    const { username, body } = req.body;
    const userId = await redisClient.get(userRedisKey);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const userInfo = await User.findById(new ObjectId(userId)).exec();
      console.log(username);
      console.log(userInfo.username);

      if (userInfo.username !== username) {
        res.status(401).json({ error: 'You can only Make Posts on your account' });
        return;
      }

      const newPost = await Post.create({ username, body });
      userInfo.posts.push(newPost);
      userInfo.save();
      res.status(201).json({ success: 'Successfully Posted', post: newPost });
    } catch (err) {
      console.log(err);
    }
  }

  static async removeMe(req, res) {
    const token = req.get('X-Token');
    const userRedisKey = `auth_${token}`;
    const userId = await redisClient.get(userRedisKey);
    const { username } = req.query;

    if (!userId) res.status(401).json({ error: 'Unauthorized' });

    try {
      const userInfo = await User.findById(new ObjectId(userId)).exec();

      if (!userInfo) {
        res.status(404).json({ error: 'User Not Found' });
        return;
      }

      if (userInfo.username !== username) {
        res.status(401).json({ error: 'Wrong Username!' });
        return;
      }

      await User.findByIdAndDelete(userInfo._id).exec();
      await redisClient.del(userRedisKey);
      res.status(301).redirect('/');
    } catch (err) {
      console.log(err);
    }
  }
}
