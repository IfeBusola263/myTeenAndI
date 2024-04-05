import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import User from '../models/user';
import Post from '../models/post';

function _hashPass(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

function checkPass(password, hashedPass) {
  return bcrypt.compare(password, hashedPass)
    .then((res) => res)
    .catch((err) => console.log(new Error(err)));
}

export default class AuthController {
  static async logIn(req, res) {
    // const token = req.get('X-Token')
    const authParam = req.get('Authorization').split(' ');

    if (authParam.length !== 2 || authParam[0] !== 'Basic') {
      res.status(400).json({ error: 'Wrong Authorization' });
      return;
    }

    const authString = Buffer.from(authParam[1], 'base64').toString('ascii');
    const [username, password] = authString.split(':');
    const userInfo = await User.findOne({ username }).exec();

    if (!userInfo) {
      res.status(404).json({ error: `User [${username}] Not Found` });
      return;
    }

    const passCheck = await checkPass(password, userInfo.password);

    if (!passCheck) {
      res.status(404).json({ error: 'Wrong Password' });
      return;
    }

    const posts = await Post.find().lean().exec();

    const allPosts = posts.map((post) => {
      delete post.__v;
      const { _id, ...rest } = post;
      return { id: _id, ...rest };
    });

    const userToken = uuidv4();
    const userRedisKey = `auth_${userToken}`;
    await redisClient.set(userRedisKey, userInfo._id.toString(), 172800);
    res.set('X-Token', userToken);
    res.status(200).json({ success: `Welcome ${username}`, posts: allPosts });
  }

  static async signUp(req, res) {
    const {
      name, username, password, email, phoneNumber,
    } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!username) {
      res.status(400).json({ error: 'Please provide a username' });
      return;
    }

    const existingUserName = await User.findOne({ username }).exec();

    if (existingUserName) {
      res.status(400).json({ error: `Username [${username}] already exists, try another one.` });
      return;
    }

    if (!email) {
      res.status(400).json({ error: 'Missing email, please provide one' });
      return;
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      res.status(400).json({ error: 'You already have an account, Please log in' });
      return;
    }

    if (!password) {
      res.status(400).json({ error: 'Please Provide a Password' });
      return;
    }

    try {
      const newUser = new User({
        name,
        username,
        email,
        phoneNumber: phoneNumber || 0,
        password: await _hashPass(password),
      });
      await newUser.save();
    } catch (err) {
      console.log(err.message);
    }

    const nUser = await User.findOne({ email }).exec();

    const userToken = uuidv4();
    const redisKey = `auth_${userToken}`;
    await redisClient.set(redisKey, nUser._id.toString(), 172800);

    res.set('X-Token', userToken);

    res.status(201).json({ success: `Welcome ${username}` });
  }

  static async logOut(req, res) {
    const token = req.get('X-Token');
    const userRedisKey = `auth_${token}`;
    const userId = await redisClient.get(userRedisKey);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const id = new dbClient.mongoose.Types.ObjectId(userId);
      const user = await User.findById(id).exec();
      if (!user) {
        res.status(404).json({ error: 'No User Found' });
        return;
      }
      await redisClient.del(userRedisKey);
      res.status(200).json({ success: 'You have successfully logged out' });
    } catch (error) {
      console.log(error.message);
    }
  }
}
