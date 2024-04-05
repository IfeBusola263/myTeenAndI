import { isEmail } from 'validator';
import dbClient from '../utils/db';
import Post from './post';

const userSchema = new dbClient.mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Please enter a valid email address'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    posts: [Post.schema],
  },
);

userSchema.pre('remove', function deleInfo(next) {
  console.log(`${this.name} is about to be deleted!`);
  next();
});

userSchema.post('findOneAndDelete', (doc, next) => {
  console.log(`${doc.name} has been deleted, We should find out why.`);
  next();
});

module.exports = dbClient.mongoose.model('User', userSchema);
