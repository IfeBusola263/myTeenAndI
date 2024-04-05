import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  static homePage(req, res) {
    res.status(200).json({ success: 'We are Live' });
  }

  static getStatus(req, res) {
    if (redisClient.isActive() && dbClient.isActive()) res.status(200).json({ status: 'ok' });
  }
}
