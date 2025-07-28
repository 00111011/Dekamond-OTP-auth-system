async function sendOtp(phone, otp) {
  const message = `Your verification code is: ${otp}`;
  console.log(`📲 Sending SMS to ${phone}: ${message}`);
}

module.exports = { sendOtp };