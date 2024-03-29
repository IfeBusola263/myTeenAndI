import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', AppController.homePage);
router.get('/status', AppController.getStatus);
router.post('/login', AuthController.logIn);
router.post('/signup', AuthController.signUp);
router.get('/logout', AuthController.logOut);

router.get('/user/dashboard', UserController.getMe);
router.get('/user/posts', UserController.getPosts);
router.post('/user/posts', UserController.newPost);
router.get('/user/delete', UserController.removeMe);
module.exports = router;
