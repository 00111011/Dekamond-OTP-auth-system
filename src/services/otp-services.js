const redisKeys = (phone) => ({
  otp: `otp:${phone}`,
  count: `otp:count:${phone}`,
  block: `otp:block:${phone}`,
});
