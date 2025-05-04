// redisClient.js
const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
