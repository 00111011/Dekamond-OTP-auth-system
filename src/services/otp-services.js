const redisClient = require('../configs/redis.config.js');

const redisKeys = (phone) => ({
  otp: `otp:${phone}`,
  count: `otp:count:${phone}`,
  block: `otp:block:${phone}`,
});

async function checkStatus(phone) {
  const keys = redisKeys(phone);

  const [otp, block] = await Promise.all([
    redisClient.get(keys.otp),
    redisClient.get(keys.block),
  ]);

  if (block) throw new Error('User is temporarily blocked');
  if (otp) throw new Error('An active OTP already exists');
}
