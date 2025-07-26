require('dotenv').config();
const app = require('./src/app');
const redisClient = require('./src/configs/redis.config.js');
const db = require('./src/configs/postgres.config.js');
const PORT = process.env.PORT || 3000;

async function connectPostgres() {
  try {
    await db.authenticate();
    console.log('✅ PostgreSQL connected successfully');
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
    process.exit(1);
  }
}


async function connectRedis() {
  try {
    await redisClient.ping();
    console.log('✅ Redis ping successfully');
  } catch (err) {
    console.error('❌ Redis  ping failed:', err);
    process.exit(1);
  }
}

async function bootstrap() {
  await connectRedis();
  await connectPostgres();
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`🚀 Dekamond OTP auth Server is running on port ${PORT}`);
      resolve(); 
    });
  });
}

bootstrap();

