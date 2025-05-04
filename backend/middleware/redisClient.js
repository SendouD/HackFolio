const redis = require('redis');

const redisUrl = process.env.REDIS_URL;

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

module.exports = redisClient;
