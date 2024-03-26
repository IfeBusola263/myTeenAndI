import mongoose from 'mongoose';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 27017;
const DB = process.env.DB || 'myTeenDb';

class DbClient {
    constructor() {
	this.mongoose = mongoose;
	this.mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);

	this.mongoose.connection.on('connected', () => {
	    console.log('Database is Set');
	}).on('error', (err) => {
	    console.log(new Error(err));
	});
	
    
    }

    isActive() {
	return this.mongoose.connection.readyState;
    }
}

const dbClient = new DbClient();
module.exports = dbClient;
