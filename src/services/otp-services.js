require('dotenv').config();
const redisClient = require('../configs/redis.config.js');
const {generateOtp} = require('../utils/otp-generator');
const { OtpRequest , User , sequelize } = require('../models');
const {sendOtp} = require('./sms-services.js');

const OTP_MAX_REQUESTS = Number(process.env.OTP_MAX_REQUESTS || 3);
const OTP_BLOCK_SECONDS = Number(process.env.OTP_BLOCK_SECONDS || 600);
const OTP_TTL_SECONDS= Number(process.env.OTP_TTL_SECONDS || 120);

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

async function handleRequestCount(phone) {
  const keys = redisKeys(phone);
  const count = await  redisClient.incr(keys.count);
  if (count === 1) {
    await  redisClient.expire(keys.count, OTP_BLOCK_SECONDS); 
  }
  if (count >= OTP_MAX_REQUESTS) {
    await  redisClient.set(keys.block, '1', 'EX', OTP_BLOCK_SECONDS);
    throw new Error('Too many requests. User is now blocked');
  }
}

async function createOtp(phone) {
  const { otp } = redisKeys(phone);
  const code = generateOtp();
  await redisClient.set(otp, code, 'EX', OTP_TTL_SECONDS);
  return code;
}

async function logOtp(userId) {
  await OtpRequest.create({
    user_id: userId,
    request_date: new Date()});
}

async function sendSMS(phone , code) {
  await sendOtp(phone, code);
}

  async function findOrCreateByPhone(phone) {
    const user = await User.findOne({ where: { phone_number: phone  } });
    if (user) return { user};

    const newUser = await User.create({ 
      phone_number : phone,
    });
    return { user: newUser};
}
async function requestOtpService(phone_number) {
  const transaction = await sequelize.transaction();
  try {
    const {user} = await findOrCreateByPhone(phone_number);
    const phone = user.phone_number;
    await checkStatus(phone);
    await handleRequestCount(phone, { transaction });
    
    const code = await createOtp(phone, { transaction });
    await logOtp(user.id, { transaction });
    await sendSMS(phone , code);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

module.exports = {requestOtpService};
