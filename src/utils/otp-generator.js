const crypto = require('crypto');

const generateOtp = (length = 5) => {  
  const max = Math.pow(10, length);
  const otp = crypto.randomInt(0, max);
  return otp.toString().padStart(length, '0');
}

module.exports = { generateOtp };