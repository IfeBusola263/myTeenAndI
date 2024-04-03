import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import Post from '../models/post';

export default class AppController {
    static homePage(req, res) {
	// try {
        //     // Loop to create 50 different posts
        //     for (let i = 0; i < 50; i++) {
	// 	const post = new Post({
        //             username: `user${i + 1}`,
        //             body: `This is post number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        //             likes: Math.floor(Math.random() * 100), // Random likes between 0 to 99
	// 	});
	// 	await post.save();
	// 	console.log(`Post ${i + 1} saved successfully.`);
        //     }

        //     console.log('All posts saved successfully.');
	// } catch (error) {
        //     console.error('Error occurred while saving posts:', error);
	// }
	// 
	res.status(200).json({"success": "We are Live"})
    }

    static getStatus(req, res) {

	if (redisClient.isActive() && dbClient.isActive())
	    res.status(200).json({status: "ok"});
    }
}
