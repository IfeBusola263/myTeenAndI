import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/', AppController.homePage);
router.get('/status', AppController.getStatus);
router.post('/login', AuthController.logIn);
router.post('/signup', AuthController.signUp);
router.get('/logout', AuthController.logOut);

module.exports = router;
