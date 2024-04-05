import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
	console.log(new Error(err));
    }).on('connect', () => {
	console.log('Redis is up and active');
    });
  }

  isActive() {
    return this.client.connected;
  }

  async get(key) {
    const get = promisify(this.client.get).bind(this.client);
    const value = await get(key);
    return value;
  }

  async set(key, value, expiration) {
    const setter = promisify(this.client.set).bind(this.client);
    await setter(key, value, 'EX', expiration);
  }

  async del(key) {
    const deletion = promisify(this.client.del).bind(this.client);
    await deletion(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
