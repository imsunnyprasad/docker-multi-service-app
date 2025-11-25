const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Connect to the Redis service using the service name 'redis'
const redisClient = redis.createClient({
    url: 'redis://redis:6379' // The service name is the hostname
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// Attempt connection immediately (important for the API to connect)
redisClient.connect();


app.get('/', (req, res) => {
    res.send('Hello from the API container!');
});

app.get('/api/status', async (req, res) => {
    let redisStatus = 'Disconnected';
    let hitCount = 0;

    try {
        if (redisClient.isReady) {
             // 1. Increment a counter in Redis
            hitCount = await redisClient.incr('api_hits');
            redisStatus = `Connected! Total Hits: ${hitCount}`;
        } else {
             redisStatus = 'Redis is initializing or failed to connect.';
        }
    } catch (error) {
        console.error('Redis operation failed:', error.message);
        redisStatus = `Connection failed: ${error.message}`;
    }
    
    res.json({
        status: 'OK',
        message: 'API is running.',
        redis_connection: redisStatus
    });
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
